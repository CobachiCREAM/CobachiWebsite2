import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Product, Category, Location } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingCart, AlertCircle, MapPin, Truck, ChevronLeft, ChevronRight } from 'lucide-react';

const headerImages = [
  {
    url: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Colorful ice cream scoops'
  },
  {
    url: 'https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Ice cream cone'
  },
  {
    url: 'https://images.pexels.com/photos/1625372/pexels-photo-1625372.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Delicious ice cream'
  },
  {
    url: 'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Ice cream variety'
  },
  {
    url: 'https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Artisan ice cream'
  }
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedFulfillment, setSelectedFulfillment] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchData() {
      const { data: cats } = await supabase
        .from('categories')
        .select('*')
        .order('display_order');

      const { data: locs } = await supabase
        .from('locations')
        .select('*')
        .order('display_order');

      const { data: prods } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (cats) setCategories(cats);
      if (locs) setLocations(locs);
      if (prods) setProducts(prods);
      setLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const locationParam = searchParams.get('location');
    if (locationParam) {
      setSelectedLocation(locationParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % headerImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % headerImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + headerImages.length) % headerImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const [productLocationMap, setProductLocationMap] = useState<Map<string, string[]>>(new Map());

  useEffect(() => {
    async function fetchProductLocations() {
      const { data } = await supabase
        .from('product_locations')
        .select('product_id, location_id');

      if (data) {
        const map = new Map<string, string[]>();
        data.forEach(pl => {
          const existing = map.get(pl.product_id) || [];
          map.set(pl.product_id, [...existing, pl.location_id]);
        });
        setProductLocationMap(map);
      }
    }

    fetchProductLocations();
  }, []);

  const filteredProducts = products.filter(p => {
    const categoryMatch = selectedCategory === 'all' || (() => {
      const category = categories.find(c => c.id === p.category_id);
      return category?.slug === selectedCategory;
    })();

    const locationMatch = selectedLocation === 'all' || (() => {
      const location = locations.find(l => l.slug === selectedLocation);
      if (!location) return false;
      const productLocations = productLocationMap.get(p.id) || [];
      return productLocations.includes(location.id);
    })();

    const fulfillmentMatch = selectedFulfillment === 'all' || (() => {
      if (selectedFulfillment === 'shipping') {
        return p.is_shippable;
      } else if (selectedFulfillment === 'pickup') {
        const productLocations = productLocationMap.get(p.id) || [];
        return productLocations.length > 0;
      }
      return true;
    })();

    return categoryMatch && locationMatch && fulfillmentMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FAC107] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading delicious flavors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="relative h-[500px] sm:h-[600px] overflow-hidden bg-gradient-to-br from-[#FAC107] via-yellow-400 to-orange-400">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-56 h-56 bg-pink-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-purple-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {headerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 right-0 w-1/2 h-full transition-opacity duration-1000 hidden md:block ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAC107] to-transparent"></div>
          </div>
        ))}

        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-black bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <ShoppingCart className="w-5 h-5 text-black" />
              <span className="text-black font-bold text-sm">Premium Handcrafted Treats</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 text-black leading-tight">
              Explore Our
              <br />
              <span className="text-white">Flavor Collection</span>
            </h1>
            <p className="text-lg sm:text-xl text-black mb-8 max-w-lg">
              From classic favorites to bold cultural creations, every flavor tells a story. Fresh ingredients, rolled to perfection.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-black bg-opacity-20 backdrop-blur-sm px-4 py-3 rounded-lg">
                <p className="text-2xl font-bold text-black">50+</p>
                <p className="text-sm text-black">Unique Flavors</p>
              </div>
              <div className="bg-black bg-opacity-20 backdrop-blur-sm px-4 py-3 rounded-lg">
                <p className="text-2xl font-bold text-black">100%</p>
                <p className="text-sm text-black">Fresh Daily</p>
              </div>
              <div className="bg-black bg-opacity-20 backdrop-blur-sm px-4 py-3 rounded-lg">
                <p className="text-2xl font-bold text-black">2</p>
                <p className="text-sm text-black">Locations</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={prevImage}
          className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all z-20 backdrop-blur-sm"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextImage}
          className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all z-20 backdrop-blur-sm"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {headerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex
                  ? 'bg-black w-8'
                  : 'bg-black/30 hover:bg-black/50'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <div className="mb-3">
            <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300 text-center">Category</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium transition-all text-xs sm:text-sm touch-manipulation ${
                  selectedCategory === 'all'
                    ? 'bg-[#FAC107] text-black'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                All Flavors
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium transition-all text-xs sm:text-sm touch-manipulation ${
                    selectedCategory === category.slug
                      ? 'bg-[#FAC107] text-black'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300 text-center flex items-center justify-center gap-1.5">
              <Truck className="w-4 h-4" />
              Fulfillment
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedFulfillment('all')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium transition-all text-xs sm:text-sm touch-manipulation ${
                  selectedFulfillment === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                All Options
              </button>
              <button
                onClick={() => setSelectedFulfillment('pickup')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium transition-all text-xs sm:text-sm touch-manipulation ${
                  selectedFulfillment === 'pickup'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <MapPin className="w-3 h-3 inline-block mr-1" />
                Pickup Only
              </button>
              <button
                onClick={() => setSelectedFulfillment('shipping')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium transition-all text-xs sm:text-sm touch-manipulation ${
                  selectedFulfillment === 'shipping'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <Truck className="w-3 h-3 inline-block mr-1" />
                Shipping Available
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300 text-center flex items-center justify-center gap-1.5">
              <MapPin className="w-4 h-4" />
              Pickup Location
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedLocation('all')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium transition-all text-xs sm:text-sm touch-manipulation ${
                  selectedLocation === 'all'
                    ? 'bg-black text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                All Locations
              </button>
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location.slug)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium transition-all text-xs sm:text-sm touch-manipulation ${
                    selectedLocation === location.slug
                      ? 'bg-black text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {location.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <AlertCircle className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">No products found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try selecting a different category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <Link to={`/product/${product.slug}`} className="block">
                  <div className="aspect-square bg-gradient-to-br from-pink-100 to-yellow-100 relative overflow-hidden">
                    {!product.in_stock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                        <span className="bg-white text-black px-4 py-2 rounded-full font-bold">
                          Coming Soon
                        </span>
                      </div>
                    )}
                    {product.is_bestseller && (
                      <div className="absolute top-4 left-4 bg-[#FAC107] text-black px-3 py-1 rounded-full text-xs font-bold z-10">
                        BEST SELLER
                      </div>
                    )}
                    {product.is_limited_edition && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                        LIMITED
                      </div>
                    )}
                    {product.is_seasonal && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                        SEASONAL
                      </div>
                    )}
                    {product.image_url && (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                  </div>
                </Link>
                <div className="p-6">
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="font-bold text-xl mb-2 dark:text-white group-hover:text-[#FAC107] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{product.short_description}</p>
                  </Link>
                  {product.allergens && product.allergens.length > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      Contains: {product.allergens.join(', ')}
                    </p>
                  )}
                  {product.is_shippable && (
                    <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-semibold mb-3">
                      <Truck className="w-3 h-3" />
                      <span>Ships Nationwide</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#FAC107]">${product.price.toFixed(2)}</span>
                    {product.in_stock ? (
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-black dark:bg-gray-700 text-white px-4 py-2 rounded-full font-bold hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add</span>
                      </button>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400 text-sm">Out of Stock</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-black to-gray-900 text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Specialty Desserts & Custom Orders</h2>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            From our famous bread pudding to sweet potato cheesecakes, we offer handcrafted desserts made from family recipes.
            Looking for custom desserts for your event? We've got you covered!
          </p>
          <Link
            to="/catering"
            className="inline-block bg-[#FAC107] text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-400 transition-colors"
          >
            Learn About Catering
          </Link>
        </div>
      </div>
    </div>
  );
}
