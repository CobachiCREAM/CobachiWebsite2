import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CateringRequest } from '../types';
import { Calendar, Users, Sparkles, Award, CheckCircle, PartyPopper } from 'lucide-react';
import CustomerLogos from '../components/CustomerLogos';
import FAQ from '../components/FAQ';

export default function Catering() {
  const [formData, setFormData] = useState<CateringRequest>({
    name: '',
    email: '',
    phone: '',
    event_type: '',
    event_date: '',
    guest_count: 0,
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('catering_requests')
        .insert([{ ...formData, status: 'pending' }]);

      if (error) throw error;

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        event_type: '',
        event_date: '',
        guest_count: 0,
        budget: '',
        message: '',
      });
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const eventTypes = [
    { name: 'Corporate Event', icon: Award },
    { name: 'Wedding', icon: PartyPopper },
    { name: 'School Event', icon: Users },
    { name: 'Private Party', icon: Calendar },
    { name: 'Festival/Fair', icon: Sparkles },
    { name: 'Other', icon: CheckCircle },
  ];

  const faqItems = [
    {
      question: "How far in advance should I book catering services?",
      answer: "We recommend booking at least 2-3 weeks in advance for most events. For larger events (50+ guests) or peak seasons, booking 4-6 weeks ahead is ideal to ensure availability."
    },
    {
      question: "What is included in your catering service?",
      answer: "Our catering service includes live ice cream rolling entertainment, all equipment and supplies, professional staff, custom flava options, premium toppings bar, and full setup/cleanup. We bring everything needed to create a memorable experience for your guests."
    },
    {
      question: "Do you accommodate dietary restrictions and allergies?",
      answer: "Absolutely! We can accommodate various dietary needs including dairy-free, vegan, gluten-free, and nut-free options. Please let us know about any restrictions when booking, and we'll work with you to create suitable alternatives."
    },
    {
      question: "How long does the catering service last?",
      answer: "Most catering events run for 2-3 hours, depending on guest count and your event schedule. We work with you to determine the best timeline for your event."
    },
    {
      question: "What is your service area?",
      answer: "We primarily serve the Atlanta metro area and surrounding Georgia communities. For events outside our standard service area, additional travel fees may apply. Contact us to discuss your location."
    },
    {
      question: "How many guests can you serve?",
      answer: "We can accommodate events of all sizes, from intimate gatherings of 20 guests to large festivals with 500+ attendees. We'll scale our setup and staff accordingly to ensure efficient service."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Cancellations made 14+ days before the event receive a full refund. Cancellations within 14 days may be subject to fees. We understand that plans change and will work with you to find a solution, including rescheduling when possible."
    },
    {
      question: "Can we customize flavas to match our event theme?",
      answer: "Yes! Custom flava creation is one of our specialties. Whether you want flavas that match your brand colors, wedding theme, or specific preferences, we'll work with you to create unique combinations that wow your guests."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[850px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/2306282/pexels-photo-2306282.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Event catering setup"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/70 z-10"></div>

        <div className="absolute inset-0 z-20">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-14 h-14 bg-[#FAC107] rounded-2xl flex items-center justify-center animate-bounce">
                  <Calendar className="w-7 h-7 text-black" />
                </div>
                <div className="h-12 w-1 bg-[#FAC107]"></div>
                <div>
                  <p className="text-[#FAC107] font-bold text-sm">PREMIUM CATERING</p>
                  <p className="text-white text-sm">Available for All Events</p>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
                Make Your Event
                <br />
                <span className="text-[#FAC107]">Unforgettable</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                Live ice cream rolling entertainment, custom flavas tailored to your theme, and full-service setup. From corporate events to weddings, we bring the experience to you.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <Sparkles className="w-8 h-8 text-[#FAC107] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">Live</p>
                  <p className="text-xs text-gray-300">Rolling Show</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <Award className="w-8 h-8 text-[#FAC107] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">Custom</p>
                  <p className="text-xs text-gray-300">Flavas</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <Users className="w-8 h-8 text-[#FAC107] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">50+</p>
                  <p className="text-xs text-gray-300">Events Done</p>
                </div>
              </div>

              <a
                href="#booking-form"
                className="bg-[#FAC107] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105 inline-flex items-center space-x-2"
              >
                <span>Request Quote</span>
                <Calendar className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent z-10"></div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-[#FAC107] rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">Live Entertainment</h3>
            <p className="text-gray-600">
              Watch our experts roll fresh ice cream right before your eyes. It's a show and dessert in one!
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-[#FAC107] rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">Custom Flavas</h3>
            <p className="text-gray-600">
              Work with us to create custom flavas that match your event theme or brand colors.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-[#FAC107] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">Full Service</h3>
            <p className="text-gray-600">
              We bring everything needed and handle all the details. You just enjoy your event!
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Perfect For Any Event</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {eventTypes.map((type) => (
              <div key={type.name} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <type.icon className="w-10 h-10 text-[#FAC107] mx-auto mb-3" />
                <p className="font-semibold">{type.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CustomerLogos />

      <div id="booking-form" className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-xl">
          <h2 className="text-3xl font-bold mb-2 text-center">Book Your Event</h2>
          <p className="text-gray-600 text-center mb-8">
            Fill out the form below and we'll get back to you within 24 hours
          </p>

          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
              <p className="text-gray-600">
                Thank you for your interest! We'll review your request and contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-bold mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FAC107] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FAC107] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-bold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FAC107] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Event Type *</label>
                  <select
                    required
                    value={formData.event_type}
                    onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FAC107] focus:outline-none"
                  >
                    <option value="">Select type</option>
                    {eventTypes.map((type) => (
                      <option key={type.name} value={type.name}>{type.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-bold mb-2">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.event_date}
                    onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FAC107] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Number of Guests *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.guest_count || ''}
                    onChange={(e) => setFormData({ ...formData, guest_count: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FAC107] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-2">Budget *</label>
                <input
                  type="text"
                  required
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="e.g., $500-$1000"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FAC107] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Additional Details</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FAC107] focus:outline-none"
                  placeholder="Tell us more about your event, dietary restrictions, preferences, etc."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FAC107] text-black py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Request Quote'}
              </button>
            </form>
          )}
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-bold mb-4 text-center">Event Showcase</h3>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-center">
            We've catered over 50 events including corporate functions, weddings, school celebrations, and community festivals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group h-[400px]">
              <img
                src="https://images.pexels.com/photos/2306282/pexels-photo-2306282.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Wedding event catering"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Weddings & Celebrations</h3>
                <p className="text-white text-lg">Make your special day even sweeter with live ice cream</p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl group h-[400px]">
              <img
                src="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Corporate event catering"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Corporate Events</h3>
                <p className="text-white text-lg">Impress clients and team members with unique entertainment</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative rounded-xl overflow-hidden shadow-lg group h-[250px]">
              <img
                src="https://images.pexels.com/photos/1024359/pexels-photo-1024359.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Ice cream at party"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition-opacity"></div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg group h-[250px]">
              <img
                src="https://images.pexels.com/photos/3758132/pexels-photo-3758132.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Festival setup"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition-opacity"></div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg group h-[250px]">
              <img
                src="https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="People enjoying dessert"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition-opacity"></div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg group h-[250px]">
              <img
                src="https://images.pexels.com/photos/2072050/pexels-photo-2072050.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Happy customers"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition-opacity"></div>
            </div>
          </div>
        </div>
      </div>

      <FAQ items={faqItems} />
    </div>
  );
}
