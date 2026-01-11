import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface ShopifyProduct {
  id: string;
  title: string;
  body_html: string;
  variants: Array<{
    id: string;
    title: string;
    price: string;
    inventory_item_id: string;
    inventory_quantity: number;
  }>;
  images: Array<{
    src: string;
  }>;
  tags: string;
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
    const shopifyAccessToken = Deno.env.get('SHOPIFY_ACCESS_TOKEN');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!shopifyDomain || !shopifyAccessToken) {
      throw new Error('Shopify credentials not configured');
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase credentials not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const shopifyUrl = `https://${shopifyDomain}/admin/api/2024-01/products.json`;
    const shopifyResponse = await fetch(shopifyUrl, {
      headers: {
        'X-Shopify-Access-Token': shopifyAccessToken,
        'Content-Type': 'application/json',
      },
    });

    if (!shopifyResponse.ok) {
      throw new Error(`Shopify API error: ${shopifyResponse.status}`);
    }

    const { products } = await shopifyResponse.json() as { products: ShopifyProduct[] };

    let synced = 0;
    let errors = 0;

    for (const product of products) {
      try {
        for (const variant of product.variants) {
          const { data: existing } = await supabase
            .from('products')
            .select('id')
            .eq('shopify_variant_id', variant.id.toString())
            .maybeSingle();

          const productData = {
            name: `${product.title}${variant.title !== 'Default Title' ? ` - ${variant.title}` : ''}`,
            short_description: product.body_html?.replace(/<[^>]*>/g, '').substring(0, 200) || '',
            description: product.body_html || '',
            price: parseFloat(variant.price),
            image_url: product.images[0]?.src || null,
            in_stock: variant.inventory_quantity > 0,
            shopify_product_id: product.id.toString(),
            shopify_variant_id: variant.id.toString(),
            shopify_inventory_item_id: variant.inventory_item_id.toString(),
            last_synced_at: new Date().toISOString(),
          };

          if (existing) {
            await supabase
              .from('products')
              .update(productData)
              .eq('id', existing.id);
          } else {
            const slug = product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            await supabase
              .from('products')
              .insert({
                ...productData,
                slug: `${slug}-${variant.id}`,
              });
          }

          synced++;
        }
      } catch (error) {
        console.error(`Error syncing product ${product.id}:`, error);
        errors++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Synced ${synced} products, ${errors} errors`,
        synced,
        errors,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Sync error:', error);
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