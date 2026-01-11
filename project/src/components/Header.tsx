import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, MapPin, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Catering', path: '/catering' },
    { name: 'STEM', path: '/stem' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'About Us', path: '/about' },
    { name: 'Find Us', path: '/locations' },
    { name: 'Contact', path: '/contact' },
    { name: 'Gift Cards', path: '/gift-card' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 h-16 sm:h-20 border-b border-gray-200 dark:border-gray-700">
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <img
                src="/cobachi_logo.png"
                alt="Cobachi C.R.E.A.M. Logo"
                className="h-10 w-10 sm:h-16 sm:w-16 object-contain"
              />
              <div className="hidden md:block">
                <h1 className="text-xl sm:text-2xl font-bold text-black dark:text-white leading-none">Cobachi</h1>
                <p className="text-xs sm:text-sm text-[#FAC107] font-semibold">C.R.E.A.M.</p>
              </div>
            </Link>

            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <Link
                to="/locations"
                className="hidden xl:flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-[#FAC107] transition-colors"
              >
                <MapPin className="w-5 h-5" />
                <span className="text-sm font-medium">Order Pickup</span>
              </Link>

              {user ? (
                <Link
                  to="/profile"
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-[#FAC107] transition-colors"
                  title="My Profile"
                >
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:block px-4 py-2 bg-[#FAC107] text-black rounded-full font-bold text-sm hover:bg-yellow-400 transition-colors"
                >
                  Sign In
                </Link>
              )}

              <ThemeToggle />

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-[#FAC107] transition-colors"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FAC107] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <nav className="overflow-x-auto scrollbar-hide py-3">
            <div className="flex items-center justify-center space-x-4 sm:space-x-6 lg:space-x-8 min-w-max">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm sm:text-base font-medium whitespace-nowrap transition-colors ${
                    isActive(item.path)
                      ? 'text-[#FAC107]'
                      : 'text-gray-700 dark:text-gray-300 hover:text-[#FAC107]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
