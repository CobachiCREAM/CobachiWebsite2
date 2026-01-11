/*
  # Create Scheduled Classes System

  1. New Tables
    - `scheduled_classes`
      - `id` (uuid, primary key) - Unique class identifier
      - `class_type` (text) - Type of class (errybody, roll_n_sip)
      - `title` (text) - Display title of the class
      - `date` (date) - Date of the class
      - `start_time` (time) - Start time of the class
      - `end_time` (time) - End time of the class
      - `capacity` (integer) - Maximum number of participants
      - `booked_count` (integer) - Current number of bookings
      - `price_per_person` (decimal) - Price per participant
      - `description` (text) - Class description
      - `is_active` (boolean) - Whether class is available for booking
      - `created_at` (timestamptz) - When class was created
      - `updated_at` (timestamptz) - Last update timestamp

  2. Changes to Existing Tables
    - Add `scheduled_class_id` to `class_bookings` table
    - Add link between bookings and scheduled classes

  3. Security
    - Enable RLS on `scheduled_classes` table
    - Add policies for public read access
    - Add policies for authenticated admin access
*/

CREATE TABLE IF NOT EXISTS scheduled_classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_type text NOT NULL,
  title text NOT NULL,
  date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  capacity integer NOT NULL DEFAULT 12,
  booked_count integer NOT NULL DEFAULT 0,
  price_per_person decimal(10, 2) NOT NULL,
  description text DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE scheduled_classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active scheduled classes"
  ON scheduled_classes
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all scheduled classes"
  ON scheduled_classes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create scheduled classes"
  ON scheduled_classes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update scheduled classes"
  ON scheduled_classes
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'class_bookings' AND column_name = 'scheduled_class_id'
  ) THEN
    ALTER TABLE class_bookings ADD COLUMN scheduled_class_id uuid REFERENCES scheduled_classes(id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_scheduled_classes_date ON scheduled_classes(date);
CREATE INDEX IF NOT EXISTS idx_scheduled_classes_type ON scheduled_classes(class_type);
CREATE INDEX IF NOT EXISTS idx_class_bookings_scheduled_class ON class_bookings(scheduled_class_id);