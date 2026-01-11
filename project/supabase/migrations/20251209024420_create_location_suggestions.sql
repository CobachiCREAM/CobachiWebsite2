/*
  # Create Location Suggestions Table

  1. New Tables
    - `location_suggestions`
      - `id` (uuid, primary key)
      - `business_name` (text) - Name of the restaurant/cafe/coffee shop
      - `business_type` (text) - Type of business (restaurant, cafe, coffee shop)
      - `address` (text) - Address of the business
      - `city` (text) - City
      - `state` (text) - State
      - `contact_name` (text) - Name of person suggesting
      - `contact_email` (text) - Email of person suggesting
      - `contact_phone` (text, optional) - Phone number of person suggesting
      - `additional_info` (text, optional) - Additional information
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `location_suggestions` table
    - Add policy for anyone to insert suggestions (public form)
    - Add policy for authenticated users to read all suggestions
*/

CREATE TABLE IF NOT EXISTS location_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  business_type text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  additional_info text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE location_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit location suggestions"
  ON location_suggestions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view location suggestions"
  ON location_suggestions
  FOR SELECT
  TO authenticated
  USING (true);