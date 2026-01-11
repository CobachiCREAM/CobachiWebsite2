import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email, is_active: true }]);

      if (error) {
        if (error.code === '23505') {
          setMessage('You are already subscribed!');
        } else {
          throw error;
        }
      } else {
        setMessage('Thank you for subscribing!');
        setEmail('');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-3 mb-4 w-fit">
              <img
                src="/cobachi_logo.png"
                alt="Cobachi C.R.E.A.M. Logo"
                className="h-16 w-16 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold">Cobachi</h1>
                <p className="text-sm text-[#FAC107] font-semibold">C.R.E.A.M.</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Where Culture Meets C.R.E.A.M. Crafting gourmet desserts and experiences that inspire and evoke nostalgia.
            </p>
            <div className="inline-block bg-[#FAC107] text-black px-3 py-1 rounded-full text-xs font-bold">
              Family-Owned Business
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-[#FAC107]">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-[#FAC107] transition-colors">Home</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-[#FAC107] transition-colors">Shop</Link></li>
              <li><Link to="/gift-card" className="text-gray-400 hover:text-[#FAC107] transition-colors">Gift Cards</Link></li>
              <li><Link to="/catering" className="text-gray-400 hover:text-[#FAC107] transition-colors">Catering</Link></li>
              <li><Link to="/stem" className="text-gray-400 hover:text-[#FAC107] transition-colors">STEM Classes</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-[#FAC107] transition-colors">About Us</Link></li>
              <li><Link to="/locations" className="text-gray-400 hover:text-[#FAC107] transition-colors">Find Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[#FAC107] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-[#FAC107]">Find Us</h3>
            <div className="space-y-4 text-sm text-gray-400">
              <div>
                <p className="font-semibold text-white mb-1">Atlanta</p>
                <p className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>504 Fair St SW<br />Atlanta, GA</span>
                </p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Buford</p>
                <p className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>2625 Mall of Georgia Blvd<br />Buford, GA</span>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-[#FAC107]">Stay Connected</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest flavors, events, and special offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 px-4 py-2 rounded-l-lg text-black focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#FAC107] text-black px-4 py-2 rounded-r-lg font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? '...' : 'Join'}
                </button>
              </div>
              {message && (
                <p className="text-sm mt-2 text-[#FAC107]">{message}</p>
              )}
            </form>
            <div className="flex space-x-4">
              <a href="https://instagram.com/cobachicream" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FAC107] transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://facebook.com/cobachicream" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FAC107] transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="mailto:hello@cobachicream.com" className="text-gray-400 hover:text-[#FAC107] transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Cobachi C.R.E.A.M. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-[#FAC107] transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-[#FAC107] transition-colors">Terms of Service</Link>
              <Link to="/shipping" className="hover:text-[#FAC107] transition-colors">Shipping & Returns</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
