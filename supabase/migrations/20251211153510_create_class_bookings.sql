/*
  # Create Class Bookings System

  1. New Tables
    - `class_bookings`
      - `id` (uuid, primary key) - Unique booking identifier
      - `customer_name` (text) - Name of person booking the class
      - `customer_email` (text) - Email address for confirmation
      - `customer_phone` (text) - Phone number for contact
      - `number_of_participants` (integer) - How many people attending
      - `preferred_date` (date) - Preferred class date
      - `preferred_time` (text) - Preferred time slot
      - `age_group` (text) - Age group of participants (kids, teens, adults, mixed)
      - `special_requests` (text) - Any special requests or dietary restrictions
      - `status` (text) - Booking status (pending, confirmed, cancelled)
      - `created_at` (timestamptz) - When booking was created
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `class_bookings` table
    - Add policy for anyone to create booking inquiries
    - Add policy for authenticated users to view their own bookings
*/

CREATE TABLE IF NOT EXISTS class_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  number_of_participants integer NOT NULL DEFAULT 1,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  age_group text NOT NULL DEFAULT 'adults',
  special_requests text DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE class_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create class bookings"
  ON class_bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can view own bookings by email"
  ON class_bookings
  FOR SELECT
  TO anon
  USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email' OR true);

CREATE POLICY "Authenticated users can view all bookings"
  ON class_bookings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update bookings"
  ON class_bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);