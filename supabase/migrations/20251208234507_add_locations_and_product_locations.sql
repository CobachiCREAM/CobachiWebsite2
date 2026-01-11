/*
  # Add Locations and Product-Location Mapping

  1. New Tables
    - `locations`
      - `id` (uuid, primary key)
      - `name` (text) - Location name (e.g., "Atlanta Location")
      - `slug` (text, unique) - URL-friendly identifier
      - `address` (text) - Street address
      - `city` (text) - City and state
      - `phone` (text) - Contact phone
      - `weekday_hours` (text) - Weekday operating hours
      - `weekend_hours` (text) - Weekend operating hours
      - `google_maps_url` (text) - Link to Google Maps
      - `features` (text[]) - Available services/features
      - `is_active` (boolean) - Whether location is currently open
      - `display_order` (integer) - Sort order
      - `created_at` (timestamptz)
    
    - `product_locations`
      - `id` (uuid, primary key)
      - `product_id` (uuid) - Foreign key to products
      - `location_id` (uuid) - Foreign key to locations
      - `created_at` (timestamptz)
      - Unique constraint on (product_id, location_id)

  2. Security
    - Enable RLS on both tables
    - Public read access for locations and product_locations
    - Only allow viewing active locations

  3. Data
    - Insert Atlanta and Buford locations
    - Map all existing products to both locations
*/

-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  phone text DEFAULT '',
  weekday_hours text DEFAULT '',
  weekend_hours text DEFAULT '',
  google_maps_url text DEFAULT '',
  features text[] DEFAULT ARRAY[]::text[],
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create product_locations junction table
CREATE TABLE IF NOT EXISTS product_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  location_id uuid NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(product_id, location_id)
);

-- Enable RLS
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_locations ENABLE ROW LEVEL SECURITY;

-- Public read access for active locations
CREATE POLICY "Anyone can view active locations"
  ON locations FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Public read access for product locations
CREATE POLICY "Anyone can view product locations"
  ON product_locations FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert locations
INSERT INTO locations (name, slug, address, city, phone, weekday_hours, weekend_hours, google_maps_url, features, display_order) VALUES
  (
    'Atlanta Location',
    'atlanta',
    '123 Peachtree Street',
    'Atlanta, GA 30303',
    '(404) 555-1234',
    'Mon-Thu: 12pm - 9pm',
    'Fri-Sun: 11am - 11pm',
    'https://maps.google.com',
    ARRAY['Dine-in', 'Takeout', 'Curbside Pickup', 'Catering Orders'],
    1
  ),
  (
    'Buford Location',
    'buford',
    '456 Buford Highway',
    'Buford, GA 30518',
    '(770) 555-5678',
    'Mon-Thu: 12pm - 9pm',
    'Fri-Sun: 11am - 11pm',
    'https://maps.google.com',
    ARRAY['Dine-in', 'Takeout', 'Curbside Pickup', 'Event Space'],
    2
  )
ON CONFLICT (slug) DO NOTHING;

-- Map all existing products to both locations
INSERT INTO product_locations (product_id, location_id)
SELECT p.id, l.id
FROM products p
CROSS JOIN locations l
ON CONFLICT (product_id, location_id) DO NOTHING;