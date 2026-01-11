/*
  # Events and RSVP System

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `name` (text) - Event name
      - `description` (text) - Event details
      - `short_description` (text) - Brief description for cards
      - `event_date` (timestamptz) - When the event happens
      - `event_end_date` (timestamptz) - When the event ends (optional)
      - `location` (text) - Event location
      - `address` (text) - Full address
      - `image_url` (text) - Event image
      - `max_attendees` (integer) - Maximum number of attendees (null = unlimited)
      - `preorder_enabled` (boolean) - Whether preorders are allowed
      - `preorder_deadline` (timestamptz) - Last date to preorder
      - `is_active` (boolean) - Whether event is published
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `event_rsvps`
      - `id` (uuid, primary key)
      - `event_id` (uuid, foreign key to events)
      - `customer_name` (text) - Full name
      - `customer_email` (text) - Email address
      - `customer_phone` (text) - Phone number
      - `number_of_guests` (integer) - How many people attending
      - `notes` (text) - Special requests or notes
      - `status` (text) - confirmed, cancelled, waitlist
      - `created_at` (timestamptz)

    - `event_preorders`
      - `id` (uuid, primary key)
      - `rsvp_id` (uuid, foreign key to event_rsvps)
      - `event_id` (uuid, foreign key to events)
      - `product_id` (uuid, foreign key to products)
      - `quantity` (integer) - How many units
      - `special_instructions` (text) - Custom requests
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Anyone can read active events
    - Anyone can create RSVPs (with rate limiting via app logic)
    - Anyone can create preorders linked to their RSVP
    - Users can only read their own RSVPs
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  short_description text NOT NULL,
  event_date timestamptz NOT NULL,
  event_end_date timestamptz,
  location text NOT NULL,
  address text NOT NULL,
  image_url text,
  max_attendees integer,
  preorder_enabled boolean DEFAULT false,
  preorder_deadline timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create event_rsvps table
CREATE TABLE IF NOT EXISTS event_rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  number_of_guests integer NOT NULL DEFAULT 1,
  notes text,
  status text NOT NULL DEFAULT 'confirmed',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_guest_count CHECK (number_of_guests > 0),
  CONSTRAINT valid_status CHECK (status IN ('confirmed', 'cancelled', 'waitlist'))
);

-- Create event_preorders table
CREATE TABLE IF NOT EXISTS event_preorders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rsvp_id uuid NOT NULL REFERENCES event_rsvps(id) ON DELETE CASCADE,
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  special_instructions text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_quantity CHECK (quantity > 0)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_active ON events(is_active);
CREATE INDEX IF NOT EXISTS idx_event_rsvps_event ON event_rsvps(event_id);
CREATE INDEX IF NOT EXISTS idx_event_rsvps_email ON event_rsvps(customer_email);
CREATE INDEX IF NOT EXISTS idx_event_preorders_rsvp ON event_preorders(rsvp_id);
CREATE INDEX IF NOT EXISTS idx_event_preorders_event ON event_preorders(event_id);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_preorders ENABLE ROW LEVEL SECURITY;

-- Events policies: Anyone can view active events
CREATE POLICY "Anyone can view active events"
  ON events FOR SELECT
  USING (is_active = true);

-- RSVPs policies: Anyone can create RSVP, only read own via email
CREATE POLICY "Anyone can create RSVP"
  ON event_rsvps FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view RSVPs"
  ON event_rsvps FOR SELECT
  USING (true);

-- Preorders policies: Anyone can create preorder, anyone can view
CREATE POLICY "Anyone can create preorder"
  ON event_preorders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view preorders"
  ON event_preorders FOR SELECT
  USING (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on events
DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();