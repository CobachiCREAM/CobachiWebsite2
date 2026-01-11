/*
  # Create Employee Inquiries Table

  1. New Tables
    - `employee_inquiries`
      - `id` (uuid, primary key)
      - `name` (text) - Full name of interested person
      - `email` (text) - Email address
      - `phone` (text, optional) - Phone number
      - `position_interest` (text) - Position they're interested in
      - `experience` (text, optional) - Relevant experience
      - `availability` (text, optional) - When they can start
      - `message` (text, optional) - Additional information
      - `status` (text) - Status of inquiry (new, reviewed, contacted, etc.)
      - `created_at` (timestamptz) - When inquiry was submitted

  2. Security
    - Enable RLS on `employee_inquiries` table
    - Add policy for anonymous users to insert inquiries
*/

CREATE TABLE IF NOT EXISTS employee_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  position_interest text NOT NULL,
  experience text,
  availability text,
  message text,
  status text DEFAULT 'new' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE employee_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit employee inquiries"
  ON employee_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);