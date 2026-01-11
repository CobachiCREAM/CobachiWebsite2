const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface CartItem {
  variantId: string;
  quantity: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const shopifyDomain = Deno.env.get('SHOPIFY_DOMAIN');
    const shopifyStorefrontToken = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');

    if (!shopifyDomain || !shopifyStorefrontToken) {
      throw new Error('Shopify credentials not configured');
    }

    const { items } = await req.json() as { items: CartItem[] };

    if (!items || items.length === 0) {
      throw new Error('No items in cart');
    }

    const lineItems = items.map(item => ({
      variantId: `gid://shopify/ProductVariant/${item.variantId}`,
      quantity: item.quantity,
    }));

    const mutation = `
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            webUrl
          }
          checkoutUserErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        lineItems,
      },
    };

    const shopifyUrl = `https://${shopifyDomain}/api/2024-01/graphql.json`;
    const response = await fetch(shopifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': shopifyStorefrontToken,
      },
      body: JSON.stringify({
        query: mutation,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    const { checkoutCreate } = result.data;

    if (checkoutCreate.checkoutUserErrors.length > 0) {
      throw new Error(checkoutCreate.checkoutUserErrors[0].message);
    }

    return new Response(
      JSON.stringify({
        success: true,
        checkoutUrl: checkoutCreate.checkout.webUrl,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});