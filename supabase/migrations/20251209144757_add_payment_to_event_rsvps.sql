/*
  # Add Payment Tracking to Event RSVPs

  1. Changes to `event_rsvps` table
    - Add `payment_status` (text) - Payment status: pending, paid, failed, refunded
    - Add `payment_amount` (decimal) - Total amount to be paid in dollars
    - Add `payment_intent_id` (text) - Stripe Payment Intent ID
    - Add `payment_completed_at` (timestamptz) - When payment was completed
    - Add `requires_payment` (boolean) - Whether this RSVP requires payment
    - Add constraint to ensure valid payment status values

  2. Changes to `event_preorders` table
    - Add `unit_price` (decimal) - Price per unit at time of preorder
    - Add `total_price` (decimal) - Total price for this line item (quantity * unit_price)

  3. Important Notes
    - Payment is required when an RSVP includes preorders
    - Payment amount is calculated from preorder totals
    - RSVPs without preorders don't require payment
    - Payment status defaults to 'pending' when payment is required
    - Stripe Payment Intent ID is stored for payment tracking and verification
*/

-- Add payment fields to event_rsvps table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'event_rsvps' AND column_name = 'payment_status'
  ) THEN
    ALTER TABLE event_rsvps 
    ADD COLUMN payment_status text DEFAULT 'pending',
    ADD COLUMN payment_amount decimal(10,2) DEFAULT 0,
    ADD COLUMN payment_intent_id text,
    ADD COLUMN payment_completed_at timestamptz,
    ADD COLUMN requires_payment boolean DEFAULT false;
  END IF;
END $$;

-- Add constraint to ensure valid payment status
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage
    WHERE constraint_name = 'valid_payment_status'
  ) THEN
    ALTER TABLE event_rsvps 
    ADD CONSTRAINT valid_payment_status 
    CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded'));
  END IF;
END $$;

-- Add price fields to event_preorders table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'event_preorders' AND column_name = 'unit_price'
  ) THEN
    ALTER TABLE event_preorders 
    ADD COLUMN unit_price decimal(10,2) NOT NULL DEFAULT 0,
    ADD COLUMN total_price decimal(10,2) NOT NULL DEFAULT 0;
  END IF;
END $$;

-- Create index for payment tracking
CREATE INDEX IF NOT EXISTS idx_event_rsvps_payment_status ON event_rsvps(payment_status);
CREATE INDEX IF NOT EXISTS idx_event_rsvps_payment_intent ON event_rsvps(payment_intent_id);

-- Function to calculate preorder total for an RSVP
CREATE OR REPLACE FUNCTION calculate_rsvp_preorder_total(rsvp_uuid uuid)
RETURNS decimal AS $$
DECLARE
  total_amount decimal;
BEGIN
  SELECT COALESCE(SUM(total_price), 0)
  INTO total_amount
  FROM event_preorders
  WHERE rsvp_id = rsvp_uuid;
  
  RETURN total_amount;
END;
$$ LANGUAGE plpgsql;

-- Function to automatically set payment amount when preorders are added
CREATE OR REPLACE FUNCTION update_rsvp_payment_amount()
RETURNS TRIGGER AS $$
DECLARE
  preorder_total decimal;
BEGIN
  -- Calculate total from all preorders for this RSVP
  preorder_total := calculate_rsvp_preorder_total(NEW.rsvp_id);
  
  -- Update the RSVP with payment info
  UPDATE event_rsvps
  SET 
    payment_amount = preorder_total,
    requires_payment = (preorder_total > 0)
  WHERE id = NEW.rsvp_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update payment amount when preorders are inserted
DROP TRIGGER IF EXISTS trigger_update_rsvp_payment_amount ON event_preorders;
CREATE TRIGGER trigger_update_rsvp_payment_amount
  AFTER INSERT OR UPDATE ON event_preorders
  FOR EACH ROW
  EXECUTE FUNCTION update_rsvp_payment_amount();

-- Update existing RSVPs to set requires_payment based on existing preorders
UPDATE event_rsvps
SET 
  payment_amount = (
    SELECT COALESCE(SUM(total_price), 0)
    FROM event_preorders
    WHERE rsvp_id = event_rsvps.id
  ),
  requires_payment = (
    SELECT COALESCE(SUM(total_price), 0) > 0
    FROM event_preorders
    WHERE rsvp_id = event_rsvps.id
  );
