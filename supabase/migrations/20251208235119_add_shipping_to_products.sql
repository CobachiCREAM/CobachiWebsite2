/*
  # Add Shipping Support to Products

  1. Changes
    - Add `is_shippable` column to products table
      - Boolean field indicating if product can be shipped
      - Defaults to false (pickup only)
    
  2. Notes
    - Products can be available for:
      - Pickup only (is_shippable = false, has location mappings)
      - Shipping only (is_shippable = true, no location mappings)
      - Both pickup and shipping (is_shippable = true, has location mappings)
    - This allows flexible fulfillment options per product
    - Specialty desserts (cheesecakes, bread pudding) are ideal for shipping
    - Fresh rolled ice cream is typically pickup only
*/

-- Add is_shippable column to products
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'is_shippable'
  ) THEN
    ALTER TABLE products ADD COLUMN is_shippable boolean DEFAULT false;
  END IF;
END $$;

-- Update specialty desserts to be shippable
UPDATE products
SET is_shippable = true
WHERE slug IN ('sweet-potato-cheesecake', 'bread-pudding');

-- Update rolled ice cream products to be available for both pickup and shipping
UPDATE products
SET is_shippable = true
WHERE slug IN ('strawberry-shortcake-roll', 'hennessy-butter-pecan', 'cookies-cream-dream', 'mango-tajin-twist');