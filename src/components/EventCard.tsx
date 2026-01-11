import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, X, Plus, Minus, Clock } from 'lucide-react';
import { Event, Product, RSVPFormData } from '../types';
import { supabase } from '../lib/supabase';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<RSVPFormData>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    number_of_guests: 1,
    notes: '',
    preorders: []
  });

  useEffect(() => {
    if (showModal && event.preorder_enabled) {
      fetchProducts();
    }
  }, [showModal, event.preorder_enabled]);

  async function fetchProducts() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('in_stock', true)
      .order('name');

    if (data) setProducts(data);
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const addPreorder = (productId: string) => {
    const existing = formData.preorders.find(p => p.product_id === productId);
    if (existing) {
      setFormData({
        ...formData,
        preorders: formData.preorders.map(p =>
          p.product_id === productId
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      });
    } else {
      setFormData({
        ...formData,
        preorders: [...formData.preorders, { product_id: productId, quantity: 1, special_instructions: '' }]
      });
    }
  };

  const removePreorder = (productId: string) => {
    const existing = formData.preorders.find(p => p.product_id === productId);
    if (existing && existing.quantity > 1) {
      setFormData({
        ...formData,
        preorders: formData.preorders.map(p =>
          p.product_id === productId
            ? { ...p, quantity: p.quantity - 1 }
            : p
        )
      });
    } else {
      setFormData({
        ...formData,
        preorders: formData.preorders.filter(p => p.product_id !== productId)
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: rsvpData, error: rsvpError } = await supabase
        .from('event_rsvps')
        .insert({
          event_id: event.id,
          customer_name: formData.customer_name,
          customer_email: formData.customer_email,
          customer_phone: formData.customer_phone,
          number_of_guests: formData.number_of_guests,
          notes: formData.notes || null,
          status: 'confirmed'
        })
        .select()
        .single();

      if (rsvpError) throw rsvpError;

      if (formData.preorders.length > 0 && rsvpData) {
        const preordersToInsert = formData.preorders.map(preorder => ({
          rsvp_id: rsvpData.id,
          event_id: event.id,
          product_id: preorder.product_id,
          quantity: preorder.quantity,
          special_instructions: preorder.special_instructions || null
        }));

        const { error: preorderError } = await supabase
          .from('event_preorders')
          .insert(preordersToInsert);

        if (preorderError) throw preorderError;
      }

      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        setFormData({
          customer_name: '',
          customer_email: '',
          customer_phone: '',
          number_of_guests: 1,
          notes: '',
          preorders: []
        });
      }, 2000);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('There was an error submitting your RSVP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPreorderQuantity = (productId: string) => {
    return formData.preorders.find(p => p.product_id === productId)?.quantity || 0;
  };

  return (
    <>
      <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
        <div className="relative h-40 overflow-hidden">
          {event.image_url ? (
            <img
              src={event.image_url}
              alt={event.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#FAC107] to-orange-400 flex items-center justify-center">
              <Calendar className="w-12 h-12 text-white opacity-50" />
            </div>
          )}
          {event.preorder_enabled && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              PREORDER
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 group-hover:text-[#FAC107] transition-colors line-clamp-2">
            {event.name}
          </h3>

          <div className="space-y-1.5 mb-3">
            <div className="flex items-start space-x-2 text-gray-700">
              <Calendar className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#FAC107]" />
              <span className="text-xs">{formatDate(event.event_date)}</span>
            </div>

            <div className="flex items-start space-x-2 text-gray-700">
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#FAC107]" />
              <div className="text-xs">
                <div className="font-semibold">{event.location}</div>
              </div>
            </div>

            {event.max_attendees && (
              <div className="flex items-center space-x-2 text-gray-700">
                <Users className="w-4 h-4 text-[#FAC107]" />
                <span className="text-xs">Max {event.max_attendees} attendees</span>
              </div>
            )}
          </div>

          <p className="text-gray-600 mb-4 text-xs line-clamp-2">{event.short_description}</p>

          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-[#FAC107] text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-yellow-400 transition-colors"
          >
            RSVP Now
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold">RSVP for {event.name}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {success ? (
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">RSVP Confirmed!</h3>
                <p className="text-gray-600">We'll send a confirmation email shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.customer_email}
                      onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.customer_phone}
                      onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Number of Guests *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.number_of_guests}
                    onChange={(e) => setFormData({ ...formData, number_of_guests: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Special Requests or Notes</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                  />
                </div>

                {event.preorder_enabled && products.length > 0 && (
                  <div className="border-t pt-6">
                    <h3 className="text-xl font-bold mb-4">Preorder Items (Optional)</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Add items to pick up at the event and skip the line!
                    </p>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {products.map((product) => {
                        const quantity = getPreorderQuantity(product.id);
                        return (
                          <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <p className="font-semibold">{product.name}</p>
                              <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {quantity > 0 && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => removePreorder(product.id)}
                                    className="w-8 h-8 bg-gray-300 hover:bg-gray-400 rounded-full flex items-center justify-center transition-colors"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="w-8 text-center font-bold">{quantity}</span>
                                </>
                              )}
                              <button
                                type="button"
                                onClick={() => addPreorder(product.id)}
                                className="w-8 h-8 bg-[#FAC107] hover:bg-yellow-400 rounded-full flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-bold hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-[#FAC107] text-black rounded-full font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Confirm RSVP'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}