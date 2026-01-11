import { Link } from 'react-router-dom';
import { MapPin, Send, Phone, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface RetailLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  hours: string;
  description: string;
}

export default function Locations() {
  const [retailLocations, setRetailLocations] = useState<RetailLocation[]>([]);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    address: '',
    city: '',
    state: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchRetailLocations();
  }, []);

  const fetchRetailLocations = async () => {
    try {
      const { data, error } = await supabase
        .from('retail_locations')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setRetailLocations(data || []);
    } catch (error) {
      console.error('Error fetching retail locations:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const { error } = await supabase
        .from('location_suggestions')
        .insert([
          {
            business_name: formData.businessName,
            business_type: formData.businessType,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            contact_name: formData.contactName,
            contact_email: formData.contactEmail,
            contact_phone: formData.contactPhone || null,
            additional_info: formData.additionalInfo || null
          }
        ]);

      if (error) throw error;

      setSubmitMessage({
        type: 'success',
        text: 'Thank you! We\'ll review your suggestion and reach out soon.'
      });
      setFormData({
        businessName: '',
        businessType: '',
        address: '',
        city: '',
        state: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        additionalInfo: ''
      });
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(250, 193, 7, 0.1) 50px, rgba(250, 193, 7, 0.1) 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(250, 193, 7, 0.1) 50px, rgba(250, 193, 7, 0.1) 51px)`,
            }}
          ></div>
        </div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#FAC107] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-[#FAC107] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-28 h-28 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.75s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center w-full">
            <div className="inline-flex items-center justify-center space-x-2 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#FAC107] rounded-full blur-xl animate-pulse"></div>
                <div className="relative w-20 h-20 bg-[#FAC107] rounded-full flex items-center justify-center transform hover:scale-110 transition-transform">
                  <MapPin className="w-10 h-10 text-black" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Find Us at Your
              <br />
              <span className="text-[#FAC107]">Favorite Spots</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
              We're a mobile business partnering with local restaurants, coffee shops, and cafes across Atlanta. Coming soon to a location near you!
            </p>

            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold">Currently Expanding to New Locations</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-[#FAC107] to-yellow-400 rounded-2xl p-8 md:p-12 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Mobile Business, Maximum Flavor</h2>
            <p className="text-lg mb-8">
              We're currently a mobile-only business, but you can find our incredible ice cream and treats at select local restaurants.
              We're also expanding to coffee shops and cafes throughout the Atlanta area soon!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Link
                to="/shop?location=atlanta"
                className="bg-black/10 backdrop-blur-sm rounded-xl p-6 hover:bg-black/20 transition-all transform hover:scale-105 cursor-pointer"
              >
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">Atlanta Location</h3>
                <p className="text-sm">123 Peachtree Street</p>
                <p className="text-sm">Atlanta, GA 30303</p>
                <p className="text-sm font-semibold mt-3 underline">Shop Atlanta Products</p>
              </Link>
              <Link
                to="/shop?location=buford"
                className="bg-black/10 backdrop-blur-sm rounded-xl p-6 hover:bg-black/20 transition-all transform hover:scale-105 cursor-pointer"
              >
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">Buford Location</h3>
                <p className="text-sm">456 Buford Highway</p>
                <p className="text-sm">Buford, GA 30518</p>
                <p className="text-sm font-semibold mt-3 underline">Shop Buford Products</p>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Where to Buy In-Store</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Visit these local establishments to enjoy Cobachi ice cream and treats. Available for purchase directly at these locations!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {retailLocations.map((location) => (
              <div
                key={location.id}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#FAC107] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">{location.name}</h3>
                    <p className="text-sm text-gray-600">{location.description}</p>
                  </div>
                </div>

                <div className="space-y-3 ml-0">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#FAC107] flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">{location.address}</p>
                      <p className="text-gray-600">{location.city}, {location.state}</p>
                    </div>
                  </div>

                  {location.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#FAC107] flex-shrink-0" />
                      <a href={`tel:${location.phone}`} className="text-sm font-medium hover:text-[#FAC107] transition-colors">
                        {location.phone}
                      </a>
                    </div>
                  )}

                  {location.hours && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#FAC107] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">{location.hours}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Know the Perfect Spot?</h2>
              <p className="text-gray-600 text-lg">
                Help us bring Cobachi C.R.E.A.M. to your favorite local restaurant, coffee shop, or cafe!
                Share your suggestion below and we'll reach out to explore partnership opportunities.
              </p>
            </div>

            {submitMessage && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitMessage.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {submitMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Business Name*</label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                    placeholder="The Coffee House"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Business Type*</label>
                  <select
                    required
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                  >
                    <option value="">Select type</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="coffee_shop">Coffee Shop</option>
                    <option value="cafe">Cafe</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Address*</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">City*</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                    placeholder="Atlanta"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">State*</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                    placeholder="GA"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-bold mb-4">Your Contact Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Your Name*</label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Your Email*</label>
                    <input
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">Your Phone (Optional)</label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                    placeholder="(404) 555-1234"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Additional Information (Optional)</label>
                  <textarea
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FAC107] focus:border-transparent resize-none"
                    placeholder="Tell us more about why this location would be perfect..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FAC107] text-black py-4 rounded-full font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Suggestion'}</span>
              </button>
            </form>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Questions About Finding Us?</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Are you opening a physical location?</h3>
              <p className="text-gray-600">
                We're focusing on partnering with existing restaurants, coffee shops, and cafes to bring our
                products to multiple locations throughout Atlanta. This allows us to serve more communities!
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">How can I find current locations?</h3>
              <p className="text-gray-600">
                Follow us on social media for announcements about where we'll be available each week, or
                contact us directly to find the nearest location serving Cobachi C.R.E.A.M.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Can I order for catering or events?</h3>
              <p className="text-gray-600">
                Absolutely! We offer catering services for events of all sizes. Visit our{' '}
                <Link to="/catering" className="text-[#FAC107] font-semibold hover:underline">
                  Catering page
                </Link>{' '}
                to learn more and request a quote.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">I own a business. How can I partner with Cobachi?</h3>
              <p className="text-gray-600">
                We'd love to explore partnership opportunities! Use the form above to suggest your business,
                or reach out through our{' '}
                <Link to="/contact" className="text-[#FAC107] font-semibold hover:underline">
                  Contact page
                </Link>{' '}
                for more information about wholesale and partnership options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
