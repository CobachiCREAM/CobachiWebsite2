/*
  # Cobachi C.R.E.A.M. Database Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text) - Category name (e.g., "Classic Flavas", "Alcohol-Infused")
      - `slug` (text, unique) - URL-friendly identifier
      - `description` (text) - Category description
      - `display_order` (integer) - Sort order
      - `created_at` (timestamptz)
    
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - Product name
      - `slug` (text, unique) - URL-friendly identifier
      - `description` (text) - Full product description
      - `short_description` (text) - Brief tagline
      - `cultural_story` (text) - Cultural inspiration/story
      - `price` (decimal) - Base price
      - `category_id` (uuid) - Foreign key to categories
      - `image_url` (text) - Main product image
      - `gallery_images` (jsonb) - Array of additional images
      - `allergens` (text[]) - Array of allergens
      - `sizes` (jsonb) - Available sizes and pricing
      - `is_featured` (boolean) - Featured on homepage
      - `is_bestseller` (boolean) - Best seller badge
      - `is_seasonal` (boolean) - Seasonal item
      - `is_limited_edition` (boolean) - Limited edition badge
      - `in_stock` (boolean) - Availability status
      - `serving_suggestions` (text) - How to serve
      - `storage_instructions` (text) - Storage info
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `testimonials`
      - `id` (uuid, primary key)
      - `customer_name` (text) - Customer name
      - `customer_photo` (text) - Photo URL
      - `quote` (text) - Testimonial text
      - `rating` (integer) - 1-5 star rating
      - `location` (text) - Customer location
      - `is_featured` (boolean) - Show on homepage
      - `created_at` (timestamptz)
    
    - `catering_requests`
      - `id` (uuid, primary key)
      - `name` (text) - Contact name
      - `email` (text) - Contact email
      - `phone` (text) - Contact phone
      - `event_type` (text) - Type of event
      - `event_date` (date) - Proposed event date
      - `guest_count` (integer) - Number of guests
      - `message` (text) - Additional details
      - `status` (text) - pending, contacted, completed
      - `created_at` (timestamptz)
    
    - `stem_inquiries`
      - `id` (uuid, primary key)
      - `school_name` (text) - School/organization name
      - `contact_name` (text) - Contact person
      - `email` (text) - Contact email
      - `phone` (text) - Contact phone
      - `grade_level` (text) - Target grade level
      - `student_count` (integer) - Number of students
      - `preferred_dates` (text) - Preferred dates
      - `message` (text) - Additional details
      - `status` (text) - pending, contacted, scheduled
      - `created_at` (timestamptz)
    
    - `newsletter_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique) - Subscriber email
      - `subscribed_at` (timestamptz)
      - `is_active` (boolean) - Subscription status
    
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text) - Contact name
      - `email` (text) - Contact email
      - `subject` (text) - Message subject
      - `message` (text) - Message content
      - `status` (text) - new, read, responded
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for products, categories, and testimonials
    - Authenticated insert for all inquiry/contact tables
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  short_description text DEFAULT '',
  cultural_story text DEFAULT '',
  price decimal(10,2) NOT NULL DEFAULT 0,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  image_url text DEFAULT '',
  gallery_images jsonb DEFAULT '[]'::jsonb,
  allergens text[] DEFAULT ARRAY[]::text[],
  sizes jsonb DEFAULT '[]'::jsonb,
  is_featured boolean DEFAULT false,
  is_bestseller boolean DEFAULT false,
  is_seasonal boolean DEFAULT false,
  is_limited_edition boolean DEFAULT false,
  in_stock boolean DEFAULT true,
  serving_suggestions text DEFAULT '',
  storage_instructions text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_photo text DEFAULT '',
  quote text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  location text DEFAULT '',
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create catering_requests table
CREATE TABLE IF NOT EXISTS catering_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  event_type text DEFAULT '',
  event_date date,
  guest_count integer DEFAULT 0,
  message text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create stem_inquiries table
CREATE TABLE IF NOT EXISTS stem_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  grade_level text DEFAULT '',
  student_count integer DEFAULT 0,
  preferred_dates text DEFAULT '',
  message text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text DEFAULT '',
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE catering_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE stem_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read access for categories
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Public read access for products
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

-- Public read access for featured testimonials
CREATE POLICY "Anyone can view featured testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (is_featured = true);

-- Allow anyone to insert catering requests
CREATE POLICY "Anyone can submit catering requests"
  ON catering_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to insert STEM inquiries
CREATE POLICY "Anyone can submit STEM inquiries"
  ON stem_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to subscribe to newsletter
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to submit contact messages
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Insert initial categories
INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Classic Flavas', 'classic-flavas', 'Our signature rolled ice cream flavors inspired by culture and tradition', 1),
  ('Alcohol-Infused Flavas', 'alcohol-infused', 'Premium ice cream with a spirited twist for adults 21+', 2),
  ('Seasonal Flavas', 'seasonal-flavas', 'Limited-time flavors celebrating the seasons', 3),
  ('Dessert Add-Ons', 'dessert-add-ons', 'Enhance your experience with delicious toppings and extras', 4),
  ('Specialty Desserts', 'specialty-desserts', 'Our famous bread pudding, cheesecakes, and more', 5)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, slug, short_description, description, cultural_story, price, category_id, is_featured, is_bestseller, in_stock, allergens, serving_suggestions, storage_instructions) VALUES
  (
    'Strawberry Shortcake Roll',
    'strawberry-shortcake-roll',
    'Fresh strawberries, vanilla cream, and cake crumbles',
    'Our most popular flavor combines fresh strawberries with rich vanilla cream and delicate cake pieces, all rolled into a beautiful presentation that tastes as good as it looks.',
    'Inspired by classic Southern celebrations where strawberry shortcake brings families together.',
    8.99,
    (SELECT id FROM categories WHERE slug = 'classic-flavas'),
    true,
    true,
    true,
    ARRAY['dairy', 'gluten', 'eggs'],
    'Serve immediately for best texture. Pairs wonderfully with whipped cream.',
    'Keep frozen at 0°F or below. Best consumed within 2 weeks.'
  ),
  (
    'Hennessy Butter Pecan',
    'hennessy-butter-pecan',
    'Premium butter pecan infused with Hennessy cognac',
    'A sophisticated blend of toasted pecans, rich butter, and premium Hennessy cognac. This adult favorite delivers smooth luxury in every bite.',
    'Celebrating Black excellence and the cultural significance of cognac in our community.',
    12.99,
    (SELECT id FROM categories WHERE slug = 'alcohol-infused'),
    true,
    true,
    true,
    ARRAY['dairy', 'tree nuts', 'alcohol'],
    'Must be 21+ to purchase. Best served slightly softened.',
    'Store frozen. Contains alcohol. Keep away from children.'
  ),
  (
    'Sweet Potato Cheesecake',
    'sweet-potato-cheesecake',
    'Creamy cheesecake with Southern sweet potato goodness',
    'Our signature sweet potato cheesecake combines the smooth richness of New York-style cheesecake with the warm, comforting flavors of Southern sweet potato pie. Topped with whipped cream and candied pecans.',
    'A tribute to family recipes passed down through generations, bringing soul food traditions to fine desserts.',
    45.00,
    (SELECT id FROM categories WHERE slug = 'specialty-desserts'),
    true,
    true,
    true,
    ARRAY['dairy', 'eggs', 'tree nuts', 'gluten'],
    'Serves 8-10. Let sit at room temperature for 10 minutes before slicing.',
    'Refrigerate immediately. Best within 5 days.'
  ),
  (
    'Bread Pudding',
    'bread-pudding',
    'Traditional Southern bread pudding with bourbon sauce',
    'Made with our grandmother''s recipe, this rich bread pudding features warm spices, plump raisins, and our signature bourbon caramel sauce. Comfort food at its finest.',
    'Rooted in African American culinary traditions, transforming simple ingredients into extraordinary desserts.',
    35.00,
    (SELECT id FROM categories WHERE slug = 'specialty-desserts'),
    true,
    true,
    true,
    ARRAY['dairy', 'eggs', 'gluten', 'alcohol'],
    'Serves 6-8. Warm in oven at 350°F for 10 minutes. Drizzle with bourbon sauce.',
    'Refrigerate. Best within 4 days. Sauce can be stored separately.'
  ),
  (
    'Cookies & Cream Dream',
    'cookies-cream-dream',
    'Crushed Oreos in vanilla ice cream heaven',
    'A fan favorite featuring premium vanilla ice cream loaded with chunks of chocolate sandwich cookies, creating the perfect balance of creamy and crunchy.',
    'Because sometimes the classics are classic for a reason.',
    8.99,
    (SELECT id FROM categories WHERE slug = 'classic-flavas'),
    true,
    true,
    true,
    ARRAY['dairy', 'gluten', 'soy'],
    'Best enjoyed immediately. Add extra cookie crumbles for more crunch.',
    'Keep frozen. Consume within 2 weeks for optimal freshness.'
  ),
  (
    'Mango Tajín Twist',
    'mango-tajin-twist',
    'Sweet mango ice cream with a spicy Tajín kick',
    'Fresh mango puree meets the tangy, spicy kick of Tajín seasoning in this bold and refreshing flavor that celebrates Latin-inspired taste profiles.',
    'Honoring the vibrant flavors and street food culture that inspire our community.',
    9.99,
    (SELECT id FROM categories WHERE slug = 'seasonal-flavas'),
    false,
    false,
    true,
    ARRAY['dairy'],
    'For extra kick, add more Tajín on top. Pair with chamoy sauce.',
    'Store frozen. Shake before serving for best consistency.'
  )
ON CONFLICT (slug) DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (customer_name, quote, rating, location, is_featured) VALUES
  ('Marcus Johnson', 'The Hennessy Butter Pecan is INCREDIBLE! Best ice cream in Atlanta, hands down. The cultural flavors really speak to me.', 5, 'Atlanta, GA', true),
  ('Keisha Williams', 'We booked Cobachi for our daughter''s graduation party and it was a HIT! The ice cream rolling station was the highlight of the night. Professional, delicious, and so much fun!', 5, 'Buford, GA', true),
  ('Dr. Sarah Mitchell', 'As a STEM coordinator, I brought Cobachi to our school for a science day. The kids learned about states of matter while making ice cream. Educational AND delicious!', 5, 'Gwinnett County, GA', true),
  ('James Anderson', 'That sweet potato cheesecake brought me back to my grandmother''s kitchen. You can taste the love and culture in every bite.', 5, 'Decatur, GA', true)
ON CONFLICT DO NOTHING;