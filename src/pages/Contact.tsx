import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { ContactMessage } from '../types';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [employeeFormData, setEmployeeFormData] = useState({
    name: '',
    email: '',
    phone: '',
    positionInterest: '',
    experience: '',
    availability: '',
    message: ''
  });
  const [isSubmittingEmployee, setIsSubmittingEmployee] = useState(false);
  const [employeeSubmitted, setEmployeeSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{ ...formData, status: 'new' }]);

      if (error) throw error;

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingEmployee(true);

    try {
      const { error } = await supabase
        .from('employee_inquiries')
        .insert([{
          name: employeeFormData.name,
          email: employeeFormData.email,
          phone: employeeFormData.phone || null,
          position_interest: employeeFormData.positionInterest,
          experience: employeeFormData.experience || null,
          availability: employeeFormData.availability || null,
          message: employeeFormData.message || null,
          status: 'new'
        }]);

      if (error) throw error;

      setEmployeeSubmitted(true);
      setEmployeeFormData({
        name: '',
        email: '',
        phone: '',
        positionInterest: '',
        experience: '',
        availability: '',
        message: ''
      });

      setTimeout(() => setEmployeeSubmitted(false), 5000);
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmittingEmployee(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[600px] overflow-hidden bg-gradient-to-br from-[#FAC107] via-yellow-400 to-orange-400">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 left-32 w-48 h-48 bg-black rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-pink-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-5xl mx-auto text-center w-full">
            <div className="inline-flex items-center justify-center space-x-3 mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-16 h-16 bg-white rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                  <MessageCircle className="w-8 h-8 text-[#FAC107]" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Let's Connect
            </h1>

            <p className="text-xl md:text-2xl text-white mb-10 max-w-2xl mx-auto">
              Questions about our flavas, catering, or STEM programs? We're here to help. Reach out and let's make something sweet happen!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:bg-white/30 transition-all transform hover:scale-105">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-[#FAC107]" />
                </div>
                <h3 className="font-bold text-white mb-2">Text Us</h3>
                <p className="text-sm text-white/80">24hr Response Time</p>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:bg-white/30 transition-all transform hover:scale-105">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-[#FAC107]" />
                </div>
                <h3 className="font-bold text-white mb-2">Email Us</h3>
                <p className="text-sm text-white/80">48hr Response Time</p>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:bg-white/30 transition-all transform hover:scale-105">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-[#FAC107]" />
                </div>
                <h3 className="font-bold text-white mb-2">Visit Us</h3>
                <p className="text-sm text-white/80">3 Locations</p>
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-flex items-center space-x-2 shadow-xl"
              >
                <Send className="w-5 h-5" />
                <span>Send Us a Message</span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-[#FAC107] rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">Text Us</h3>
            <a href="tel:6784214577" className="text-lg font-semibold hover:text-[#FAC107]">
              (678) 421-4577
            </a>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-[#FAC107] rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">Email Us</h3>
            <a href="mailto:info@cobachicream.com" className="text-lg font-semibold hover:text-[#FAC107] block mb-2">
              info@cobachicream.com
            </a>
            <p className="text-sm text-gray-600">We respond within 48 hours</p>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-[#FAC107] rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">Visit Us</h3>
            <p className="text-gray-600 mb-2">3 Locations</p>
            <Link to="/locations" className="text-lg font-semibold hover:text-[#FAC107]">
              See Where to Find Us
            </Link>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-black to-gray-900 rounded-2xl p-8 md:p-10 shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#FAC107] rounded-full flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-black" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Join Our Team!</h2>
                <p className="text-gray-300">
                  Looking for passionate people to help us bring culture & flava to communities. Submit your info below!
                </p>
              </div>
            </div>

            {employeeSubmitted ? (
              <div className="mt-6 bg-green-500 text-white p-4 rounded-lg text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Thanks! We'll review your information and be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleEmployeeSubmit} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    value={employeeFormData.name}
                    onChange={(e) => setEmployeeFormData({ ...employeeFormData, name: e.target.value })}
                    className="px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#FAC107] focus:outline-none"
                    placeholder="Your Name *"
                  />
                  <input
                    type="email"
                    required
                    value={employeeFormData.email}
                    onChange={(e) => setEmployeeFormData({ ...employeeFormData, email: e.target.value })}
                    className="px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#FAC107] focus:outline-none"
                    placeholder="Email Address *"
                  />
                  <input
                    type="tel"
                    value={employeeFormData.phone}
                    onChange={(e) => setEmployeeFormData({ ...employeeFormData, phone: e.target.value })}
                    className="px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#FAC107] focus:outline-none"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <select
                    required
                    value={employeeFormData.positionInterest}
                    onChange={(e) => setEmployeeFormData({ ...employeeFormData, positionInterest: e.target.value })}
                    className="px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#FAC107] focus:outline-none"
                  >
                    <option value="">Position Interest *</option>
                    <option value="production">Ice Cream Production</option>
                    <option value="sales">Sales & Distribution</option>
                    <option value="events">Events & Catering</option>
                    <option value="marketing">Marketing & Social Media</option>
                    <option value="stem">STEM Education</option>
                    <option value="other">Other</option>
                  </select>
                  <input
                    type="text"
                    value={employeeFormData.availability}
                    onChange={(e) => setEmployeeFormData({ ...employeeFormData, availability: e.target.value })}
                    className="px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#FAC107] focus:outline-none"
                    placeholder="Availability (e.g., Immediate, 2 weeks)"
                  />
                </div>
                <div className="mt-4">
                  <textarea
                    value={employeeFormData.experience}
                    onChange={(e) => setEmployeeFormData({ ...employeeFormData, experience: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#FAC107] focus:outline-none resize-none"
                    placeholder="Brief description of relevant experience (optional)"
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmittingEmployee}
                    className="bg-[#FAC107] text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50 flex items-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>{isSubmittingEmployee ? 'Submitting...' : 'Submit Application'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-xl">
          <h2 className="text-3xl font-bold mb-2 text-center">Send Us a Message</h2>
          <p className="text-gray-600 text-center mb-8">
            Fill out the form below and we'll get back to you as soon as possible
          </p>

          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for reaching out. We'll respond to your message within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-[#FAC107] font-bold hover:underline"
              >
                Send Another Message
              </button>
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
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FAC107] focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-2">Subject *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FAC107] focus:outline-none"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Message *</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FAC107] focus:outline-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FAC107] text-black py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Link to="/catering" className="bg-black text-white rounded-xl p-6 text-center hover:bg-gray-900 transition-colors">
            <h3 className="font-bold text-lg mb-2">Catering Inquiries</h3>
            <p className="text-sm text-gray-300 mb-3">Book us for your next event</p>
            <span className="text-[#FAC107] font-semibold">Learn More →</span>
          </Link>

          <Link to="/stem" className="bg-black text-white rounded-xl p-6 text-center hover:bg-gray-900 transition-colors">
            <h3 className="font-bold text-lg mb-2">STEM Programs</h3>
            <p className="text-sm text-gray-300 mb-3">Bring education to your school</p>
            <span className="text-[#FAC107] font-semibold">Learn More →</span>
          </Link>

          <Link to="/shop" className="bg-black text-white rounded-xl p-6 text-center hover:bg-gray-900 transition-colors">
            <h3 className="font-bold text-lg mb-2">General Questions</h3>
            <p className="text-sm text-gray-300 mb-3">Check our FAQ section</p>
            <span className="text-[#FAC107] font-semibold">View FAQ →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
