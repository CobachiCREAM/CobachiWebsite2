/*
  # Create Flavor Suggestions Table

  1. New Tables
    - `flavor_suggestions`
      - `id` (uuid, primary key)
      - `customer_name` (text) - Name of the person suggesting the flavor
      - `customer_email` (text) - Email address for follow-up
      - `flavor_name` (text) - Suggested flavor name
      - `description` (text) - Description of the flavor idea
      - `inspiration` (text) - What inspired this flavor
      - `status` (text) - Status of the suggestion (pending, reviewed, approved, created)
      - `created_at` (timestamptz) - When the suggestion was submitted

  2. Security
    - Enable RLS on `flavor_suggestions` table
    - Add policy for anyone to submit suggestions (insert only)
    - No public read access to protect customer data
*/

CREATE TABLE IF NOT EXISTS flavor_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  flavor_name text NOT NULL,
  description text NOT NULL DEFAULT '',
  inspiration text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE flavor_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit flavor suggestions"
  ON flavor_suggestions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);