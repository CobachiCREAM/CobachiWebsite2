/*
  # Add Budget Field to Catering Requests

  1. Changes
    - Add `budget` column to catering_requests table
      - Text field to capture budget information
      - Required field (NOT NULL)
    
  2. Notes
    - This field captures the client's budget for the catering event
    - Helps Cobachi provide appropriate pricing and options
    - Default value set to empty string for any existing records
*/

-- Add budget column to catering_requests
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'catering_requests' AND column_name = 'budget'
  ) THEN
    ALTER TABLE catering_requests ADD COLUMN budget text NOT NULL DEFAULT '';
  END IF;
END $$;