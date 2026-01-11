/*
  # Add Budget Field to STEM Inquiries

  1. Changes
    - Add `budget` column to stem_inquiries table
      - Text field to capture budget information
      - Required field (NOT NULL)
    
  2. Notes
    - This field captures the school/organization's budget for the STEM program
    - Helps Cobachi provide appropriate pricing and options
    - Default value set to empty string for any existing records
*/

-- Add budget column to stem_inquiries
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'stem_inquiries' AND column_name = 'budget'
  ) THEN
    ALTER TABLE stem_inquiries ADD COLUMN budget text NOT NULL DEFAULT '';
  END IF;
END $$;