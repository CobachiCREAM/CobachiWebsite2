import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Calendar, GraduationCap, Heart, Star, ArrowRight, Sparkles, Users, Award, MapPin, Gift, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product, Testimonial, Event } from '../types';
import EventCard from '../components/EventCard';
import FlavorSuggestionForm from '../components/FlavorSuggestionForm';
import CustomerLogos from '../components/CustomerLogos';

const heroImages = [
  {
    url: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Colorful ice cream varieties'
  },
  {
    url: 'https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Fresh ice cream cone'
  },
  {
    url: 'https://images.pexels.com/photos/1625372/pexels-photo-1625372.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Delicious rolled ice cream'
  },
  {
    url: 'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Artisan ice cream selection'
  },
  {
    url: 'https://images.pexels.com/photos/1352296/pexels-photo-1352296.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Premium ice cream cups'
  }
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const { data: featured } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .limit(6);

      const { data: best } = await supabase
        .from('products')
        .select('*')
        .eq('is_bestseller', true)
        .limit(4);

      const { data: reviews } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_featured', true)
        .limit(4);

      const { data: events } = await supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true })
        .limit(3);

      if (featured) setFeaturedProducts(featured);
      if (best) setBestsellers(best);
      if (reviews) setTestimonials(reviews);
      if (events) setUpcomingEvents(events);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextHeroImage = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevHeroImage = () => {
    setCurrentHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToHeroImage = (index: number) => {
    setCurrentHeroIndex(index);
  };

  return (
    <div>
      <section id="hero" className="relative overflow-hidden">
        <div className="relative h-[500px] sm:h-[550px] md:h-[600px]">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentHeroIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/80"></div>
            </div>
          ))}

          <div className="absolute inset-0 flex items-center justify-center pt-8">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center text-white">
                <div className="inline-block bg-[#FAC107] text-black px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm mb-4 sm:mb-6 animate-bounce">
                  <span className="hidden sm:inline">🎉 Family-Owned • Culture-Driven • STEM-Focused</span>
                  <span className="sm:hidden">🎉 Family-Owned • Culture-Driven</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-4">
                  Where Culture Meets <span className="text-[#FAC107]">C.R.E.A.M.</span>
                </h1>
                <p className="text-base sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 leading-relaxed px-4">
                  Experience rolled ice cream like never before. Handcrafted flavors inspired by our culture,
                  served with purpose, and made to create unforgettable moments.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                  <Link
                    to="/shop"
                    className="bg-[#FAC107] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-yellow-400 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 touch-manipulation"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Shop Ice Cream</span>
                  </Link>
                  <Link
                    to="/locations"
                    className="border-2 border-[#FAC107] text-[#FAC107] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-[#FAC107] hover:text-black transition-all flex items-center justify-center space-x-2 touch-manipulation"
                  >
                    <span>Order Pickup</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/catering"
                    className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-white hover:text-black transition-all flex items-center justify-center space-x-2 touch-manipulation"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Book Catering</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={prevHeroImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-20 backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextHeroImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-20 backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToHeroImage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentHeroIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10"></div>
      </section>

      <section id="gift-cards" className="py-12 bg-[#FAC107]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-4 transform rotate-6 hover:rotate-0 transition-transform duration-300">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-black">
              Give the Gift of <span className="text-black">C.R.E.A.M.</span>
            </h2>
            <p className="text-black mb-6 max-w-2xl mx-auto">
              Share the joy of handcrafted rolled ice cream with your loved ones. Perfect for any occasion!
            </p>
            <Link
              to="/gift-card"
              className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
            >
              <Gift className="w-5 h-5" />
              <span>Buy a Gift Card</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="py-12 sm:py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-[#FAC107] rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-bold text-xl mb-2 dark:text-white">100% Fresh</h3>
              <p className="text-gray-600 dark:text-gray-300">Made to order with premium ingredients</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-[#FAC107] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-bold text-xl mb-2 dark:text-white">Culturally Inspired</h3>
              <p className="text-gray-600 dark:text-gray-300">Flavors that celebrate our heritage</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-[#FAC107] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-bold text-xl mb-2 dark:text-white">Community First</h3>
              <p className="text-gray-600 dark:text-gray-300">Supporting local & giving back</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-[#FAC107] rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-bold text-xl mb-2 dark:text-white">STEM Education</h3>
              <p className="text-gray-600 dark:text-gray-300">Teaching through delicious science</p>
            </div>
          </div>
        </div>
      </section>

      <section id="bestsellers" className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">Best Sellers</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Our customers' favorite flavors</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellers.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                className="group bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="aspect-square bg-gradient-to-br from-pink-100 to-yellow-100 relative overflow-hidden">
                  <div className="absolute top-4 right-4 bg-[#FAC107] text-black px-3 py-1 rounded-full text-xs font-bold">
                    BEST SELLER
                  </div>
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 dark:text-white group-hover:text-[#FAC107] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{product.short_description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#FAC107]">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-[#FAC107] transition-colors">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-900 transition-colors"
            >
              <span>Shop All Flavors</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              Experience the <span className="text-[#FAC107]">C.R.E.A.M.</span> Difference
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Handcrafted rolled ice cream made fresh before your eyes</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl group h-[300px]">
              <img
                src="https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Rolled ice cream being prepared"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Made Fresh to Order</h3>
                <p className="text-white">Watch as we transform premium ingredients into rolls of pure deliciousness</p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl group h-[300px]">
              <img
                src="https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Variety of ice cream flavors"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Endless Flavor Combinations</h3>
                <p className="text-white">From traditional favorites to bold cultural creations</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl group h-[250px]">
              <img
                src="https://images.pexels.com/photos/2238309/pexels-photo-2238309.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Ice cream with toppings"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-xl font-bold text-white mb-1">Premium Toppings</h3>
                <p className="text-white text-sm">Fresh fruits, candies & more</p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl group h-[250px]">
              <img
                src="https://images.pexels.com/photos/1625315/pexels-photo-1625315.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Beautiful ice cream presentation"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-xl font-bold text-white mb-1">Instagram Worthy</h3>
                <p className="text-white text-sm">Every creation is a work of art</p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl group h-[250px]">
              <img
                src="https://images.pexels.com/photos/1352296/pexels-photo-1352296.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Ice cream cups ready to serve"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-xl font-bold text-white mb-1">Perfect for Sharing</h3>
                <p className="text-white text-sm">Or keep it all to yourself</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="mission" className="py-16 bg-gradient-to-br from-[#FAC107] to-yellow-400">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Our Mission: Where Culture Meets STEM
                </h2>
                <p className="text-lg mb-6">
                  Born from a STEM class project, Cobachi C.R.E.A.M. is more than ice cream.
                  We're building community, celebrating culture, and inspiring the next generation
                  of scientists and entrepreneurs.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <Award className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold">Cultural Excellence</h4>
                      <p className="text-sm">Celebrating our heritage through every flavor</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <GraduationCap className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold">STEM Education</h4>
                      <p className="text-sm">Teaching science through hands-on ice cream making</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Heart className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold">Community Impact</h4>
                      <p className="text-sm">Giving back and supporting local initiatives</p>
                    </div>
                  </div>
                </div>
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-900 transition-colors"
                >
                  <span>Our Story</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 text-center">
                  <p className="text-4xl font-bold text-black mb-2">500+</p>
                  <p className="text-sm text-gray-700">Students Taught</p>
                </div>
                <div className="bg-black text-white rounded-2xl p-6 text-center">
                  <p className="text-4xl font-bold text-[#FAC107] mb-2">50+</p>
                  <p className="text-sm">Events Catered</p>
                </div>
                <div className="bg-black text-white rounded-2xl p-6 text-center">
                  <p className="text-4xl font-bold text-[#FAC107] mb-2">100%</p>
                  <p className="text-sm">Family-Owned</p>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center">
                  <p className="text-4xl font-bold text-black mb-2">5⭐</p>
                  <p className="text-sm text-gray-700">Customer Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="flavors" className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Flavas Inspired by <span className="text-[#FAC107]">Culture</span>
            </h2>
            <p className="text-xl text-gray-300">Each flavor tells a story</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 6).map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FAC107] to-orange-400">
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-[#FAC107] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-200 text-sm mb-3 line-clamp-2">{product.cultural_story}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                    <span className="text-[#FAC107] font-semibold">Discover →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FlavorSuggestionForm />

      <CustomerLogos />

      <section id="testimonials" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">Why Customers Love Us</h2>
            <div className="flex items-center justify-center space-x-2 text-[#FAC107]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-current" />
              ))}
              <span className="text-gray-600 dark:text-gray-300 ml-2">(500+ Reviews)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                <div className="flex items-center space-x-2 mb-4 text-[#FAC107]">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 flex-shrink-0">
                    {testimonial.customer_photo && (
                      <img
                        src={testimonial.customer_photo}
                        alt={testimonial.customer_name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-bold dark:text-white">{testimonial.customer_name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {upcomingEvents.length > 0 && (
        <section id="events" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
                Upcoming <span className="text-[#FAC107]">Events</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Join us at our next event and experience C.R.E.A.M. in action
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="catering" className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Make Your Event <span className="text-[#FAC107]">Unforgettable</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              From corporate events to weddings, festivals to private parties — bring the Cobachi experience to your guests
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-800 rounded-xl p-6">
                <Calendar className="w-12 h-12 text-[#FAC107] mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Live Ice Cream Rolling</h3>
                <p className="text-sm text-gray-400">Entertainment and dessert in one</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <Users className="w-12 h-12 text-[#FAC107] mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Custom Flavors</h3>
                <p className="text-sm text-gray-400">Tailored to your event theme</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <Award className="w-12 h-12 text-[#FAC107] mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Full Service</h3>
                <p className="text-sm text-gray-400">We handle everything</p>
              </div>
            </div>
            <Link
              to="/catering"
              className="inline-flex items-center space-x-2 bg-[#FAC107] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors"
            >
              <span>Book Us for Your Event</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section id="social" className="py-16 bg-gradient-to-br from-pink-50 via-white to-yellow-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-20 h-20 bg-[#FAC107] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-300 dark:bg-pink-600 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              Follow Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">C.R.E.A.M.</span> Journey
            </h2>

            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              See our latest flavors, behind-the-scenes action, customer creations, and community events. Join our growing family!
            </p>

            <a
              href="https://instagram.com/cobachicream"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Instagram className="w-6 h-6" />
              <span>@cobachicream</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white dark:bg-gray-700 bg-opacity-60 dark:bg-opacity-80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">10K+</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Followers</p>
              </div>
              <div className="bg-white dark:bg-gray-700 bg-opacity-60 dark:bg-opacity-80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">500+</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Posts</p>
              </div>
              <div className="bg-white dark:bg-gray-700 bg-opacity-60 dark:bg-opacity-80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Daily</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Updates</p>
              </div>
              <div className="bg-white dark:bg-gray-700 bg-opacity-60 dark:bg-opacity-80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">100%</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Delicious</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
