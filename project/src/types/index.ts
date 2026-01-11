export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  cultural_story: string;
  price: number;
  category_id: string;
  image_url: string;
  gallery_images: string[];
  allergens: string[];
  sizes: ProductSize[];
  is_featured: boolean;
  is_bestseller: boolean;
  is_seasonal: boolean;
  is_limited_edition: boolean;
  in_stock: boolean;
  is_shippable: boolean;
  serving_suggestions: string;
  storage_instructions: string;
  shopify_product_id?: string;
  shopify_variant_id?: string;
  shopify_inventory_item_id?: string;
  last_synced_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductSize {
  name: string;
  price: number;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  customer_photo: string;
  quote: string;
  rating: number;
  location: string;
  is_featured: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: ProductSize;
}

export interface CateringRequest {
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string;
  guest_count: number;
  budget: string;
  message: string;
}

export interface STEMInquiry {
  school_name: string;
  contact_name: string;
  email: string;
  phone: string;
  grade_level: string;
  student_count: number;
  budget: string;
  preferred_dates: string;
  message: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  short_description: string;
  event_date: string;
  event_end_date: string | null;
  location: string;
  address: string;
  image_url: string | null;
  max_attendees: number | null;
  preorder_enabled: boolean;
  preorder_deadline: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventRSVP {
  id: string;
  event_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  number_of_guests: number;
  notes: string | null;
  status: 'confirmed' | 'cancelled' | 'waitlist';
  created_at: string;
}

export interface EventPreorder {
  id: string;
  rsvp_id: string;
  event_id: string;
  product_id: string;
  quantity: number;
  special_instructions: string | null;
  created_at: string;
}

export interface RSVPFormData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  number_of_guests: number;
  notes: string;
  preorders: PreorderItem[];
}

export interface PreorderItem {
  product_id: string;
  quantity: number;
  special_instructions: string;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  phone: string;
  weekday_hours: string;
  weekend_hours: string;
  google_maps_url: string;
  features: string[];
  is_active: boolean;
  display_order: number;
  created_at: string;
}
