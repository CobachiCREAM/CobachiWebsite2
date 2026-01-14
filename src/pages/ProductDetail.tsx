import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Heart, Share2, AlertCircle, Star, ArrowLeft } from 'lucide-react';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return;

      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (data) {
        setProduct(data);

        const { data: related } = await supabase
          .from('products')
          .select('*')
          .eq('category_id', data.category_id)
          .neq('id', data.id)
          .limit(4);

        if (related) setRelatedProducts(related);
      }
      setLoading(false);
    }

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FAC107] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Product Not Found</h2>
          <Link to="/shop" className="text-[#FAC107] font-bold hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/shop" className="inline-flex items-center space-x-2 text-gray-600 hover:text-[#FAC107] mb-8">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Shop</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="bg-gradient-to-br from-pink-100 to-yellow-100 rounded-2xl overflow-hidden aspect-square mb-4">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center space-x-3 mb-4">
              {product.is_bestseller && (
                <span className="bg-[#FAC107] text-black px-3 py-1 rounded-full text-xs font-bold">
                  BEST SELLER
                </span>
              )}
              {product.is_limited_edition && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  LIMITED EDITION
                </span>
              )}
              {product.is_seasonal && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  SEASONAL
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex text-[#FAC107]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-gray-600">(127 reviews)</span>
            </div>

            <p className="text-3xl font-bold text-[#FAC107] mb-6">${product.price.toFixed(2)}</p>

            <div className="bg-white rounded-xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>

              {product.cultural_story && (
                <div className="bg-[#FAC107] bg-opacity-10 rounded-lg p-4 mb-4">
                  <h4 className="font-bold mb-2">Cultural Story</h4>
                  <p className="text-gray-700 text-sm">{product.cultural_story}</p>
                </div>
              )}

              {product.allergens && product.allergens.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-bold mb-2">Allergens</h4>
                  <p className="text-sm text-gray-600">{product.allergens.join(', ')}</p>
                </div>
              )}

              {product.serving_suggestions && (
                <div className="mb-4">
                  <h4 className="font-bold mb-2">Serving Suggestions</h4>
                  <p className="text-sm text-gray-600">{product.serving_suggestions}</p>
                </div>
              )}

              {product.storage_instructions && (
                <div>
                  <h4 className="font-bold mb-2">Storage Instructions</h4>
                  <p className="text-sm text-gray-600">{product.storage_instructions}</p>
                </div>
              )}
            </div>

            {product.in_stock ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="font-bold">Quantity:</label>
                  <div className="flex items-center space-x-3 bg-white rounded-lg px-4 py-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-gray-600 hover:text-black font-bold text-xl"
                    >
                      −
                    </button>
                    <span className="font-bold text-lg w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-gray-600 hover:text-black font-bold text-xl"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    setQuantity(1);
                  }}
                  className="w-full bg-[#FAC107] text-black py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span>Add to Cart</span>
                </button>

                <div className="flex space-x-3">
                  <button className="flex-1 border-2 border-gray-300 py-3 rounded-full font-bold hover:border-gray-400 transition-colors flex items-center justify-center space-x-2">
                    <Heart className="w-5 h-5" />
                    <span>Save</span>
                  </button>
                  <button className="flex-1 border-2 border-gray-300 py-3 rounded-full font-bold hover:border-gray-400 transition-colors flex items-center justify-center space-x-2">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 rounded-xl p-6 text-center">
                <p className="text-xl font-bold text-gray-600 mb-2">Currently Unavailable</p>
                <p className="text-gray-500 mb-4">This flava will be back soon!</p>
                <button className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-900 transition-colors">
                  Email Me When Available
                </button>
              </div>
            )}

            <div className="mt-6 bg-gray-100 rounded-xl p-4 text-sm text-gray-600">
              <p>🚚 Free pickup at both locations</p>
              <p>❄️ Keep frozen until ready to serve</p>
              <p>🔒 Secure checkout guaranteed</p>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="aspect-square bg-gradient-to-br from-pink-100 to-yellow-100">
                    {relatedProduct.image_url && (
                      <img
                        src={relatedProduct.image_url}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#FAC107] transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-2xl font-bold text-[#FAC107]">${relatedProduct.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
