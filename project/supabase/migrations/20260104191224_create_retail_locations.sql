/*
  # Create Retail Locations Table

  1. New Tables
    - `retail_locations`
      - `id` (uuid, primary key)
      - `name` (text) - Establishment name
      - `address` (text) - Street address
      - `city` (text) - City
      - `state` (text) - State
      - `phone` (text) - Contact phone (optional)
      - `hours` (text) - Operating hours (optional)
      - `description` (text) - Brief description (optional)
      - `is_active` (boolean) - Whether location is currently active
      - `display_order` (integer) - Sort order
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on retail_locations table
    - Public read access for active retail locations

  3. Data
    - Insert sample retail locations
*/

-- Create retail_locations table
CREATE TABLE IF NOT EXISTS retail_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  phone text DEFAULT '',
  hours text DEFAULT '',
  description text DEFAULT '',
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE retail_locations ENABLE ROW LEVEL SECURITY;

-- Public read access for active retail locations
CREATE POLICY "Anyone can view active retail locations"
  ON retail_locations FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Insert sample retail locations
INSERT INTO retail_locations (name, address, city, state, phone, hours, description, display_order) VALUES
  (
    'The Cozy Coffee Shop',
    '789 Main Street',
    'Atlanta',
    'GA',
    '(404) 555-9876',
    'Mon-Fri: 7am - 7pm, Sat-Sun: 8am - 6pm',
    'Your favorite neighborhood coffee shop now serving Cobachi ice cream!',
    1
  ),
  (
    'Downtown Diner',
    '321 Commerce Drive',
    'Atlanta',
    'GA',
    '(404) 555-4321',
    'Daily: 6am - 10pm',
    'Classic diner with breakfast, lunch, dinner, and Cobachi desserts!',
    2
  ),
  (
    'Sweet Treats Cafe',
    '555 Highland Avenue',
    'Decatur',
    'GA',
    '(404) 555-7890',
    'Mon-Thu: 11am - 9pm, Fri-Sat: 11am - 11pm',
    'Artisan cafe featuring Cobachi rolled ice cream and specialty desserts.',
    3
  )
ON CONFLICT DO NOTHING;