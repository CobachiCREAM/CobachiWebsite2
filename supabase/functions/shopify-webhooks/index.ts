import { createClient } from 'npm:@supabase/supabase-js@2.57.4';
import { createHmac } from 'node:crypto';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey, X-Shopify-Hmac-Sha256, X-Shopify-Topic',
};

function verifyShopifyWebhook(body: string, hmacHeader: string, secret: string): boolean {
  const hash = createHmac('sha256', secret)
    .update(body, 'utf8')
    .digest('base64');
  return hash === hmacHeader;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const shopifyWebhookSecret = Deno.env.get('SHOPIFY_WEBHOOK_SECRET');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase credentials not configured');
    }

    const hmacHeader = req.headers.get('X-Shopify-Hmac-Sha256');
    const topic = req.headers.get('X-Shopify-Topic');
    const body = await req.text();

    if (shopifyWebhookSecret && hmacHeader) {
      const isValid = verifyShopifyWebhook(body, hmacHeader, shopifyWebhookSecret);
      if (!isValid) {
        return new Response(
          JSON.stringify({ error: 'Invalid webhook signature' }),
          {
            status: 401,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        );
      }
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const data = JSON.parse(body);

    if (topic === 'products/update') {
      const productId = data.id?.toString();
      if (!productId) {
        throw new Error('No product ID in webhook');
      }

      for (const variant of data.variants || []) {
        const variantId = variant.id?.toString();
        if (!variantId) continue;

        const { data: product } = await supabase
          .from('products')
          .select('id')
          .eq('shopify_variant_id', variantId)
          .maybeSingle();

        if (product) {
          await supabase
            .from('products')
            .update({
              name: `${data.title}${variant.title !== 'Default Title' ? ` - ${variant.title}` : ''}`,
              price: parseFloat(variant.price),
              in_stock: variant.inventory_quantity > 0,
              image_url: data.images?.[0]?.src || null,
              last_synced_at: new Date().toISOString(),
            })
            .eq('id', product.id);
        }
      }
    } else if (topic === 'inventory_levels/update') {
      const inventoryItemId = data.inventory_item_id?.toString();
      if (inventoryItemId) {
        const { data: product } = await supabase
          .from('products')
          .select('id')
          .eq('shopify_inventory_item_id', inventoryItemId)
          .maybeSingle();

        if (product) {
          await supabase
            .from('products')
            .update({
              in_stock: data.available > 0,
              last_synced_at: new Date().toISOString(),
            })
            .eq('id', product.id);
        }
      }
    } else if (topic === 'products/delete') {
      const productId = data.id?.toString();
      if (productId) {
        await supabase
          .from('products')
          .update({ in_stock: false })
          .eq('shopify_product_id', productId);
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Webhook error:', error);
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