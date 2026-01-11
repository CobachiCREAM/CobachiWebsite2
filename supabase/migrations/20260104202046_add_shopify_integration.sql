/*
  # Add Shopify Integration to Products

  1. Changes
    - Add `shopify_product_id` to products table to store Shopify product ID
    - Add `shopify_variant_id` to products table to store Shopify variant ID
    - Add `shopify_inventory_item_id` to products table for inventory tracking
    - Add `last_synced_at` timestamp to track sync status
    - Create index on shopify_product_id for faster lookups
  
  2. Purpose
    - Enable bidirectional sync between Shopify and Supabase
    - Track when products were last synced from Shopify
    - Allow webhook handlers to update products by Shopify ID
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'shopify_product_id'
  ) THEN
    ALTER TABLE products ADD COLUMN shopify_product_id text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'shopify_variant_id'
  ) THEN
    ALTER TABLE products ADD COLUMN shopify_variant_id text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'shopify_inventory_item_id'
  ) THEN
    ALTER TABLE products ADD COLUMN shopify_inventory_item_id text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'last_synced_at'
  ) THEN
    ALTER TABLE products ADD COLUMN last_synced_at timestamptz;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS products_shopify_product_id_idx ON products(shopify_product_id);
CREATE INDEX IF NOT EXISTS products_shopify_variant_id_idx ON products(shopify_variant_id);