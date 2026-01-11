import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen, checkout, isCheckingOut } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col transition-colors duration-300">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold dark:text-white">Your Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors touch-manipulation"
          >
            <X className="w-6 h-6 dark:text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">Your cart is empty</p>
              <p className="text-gray-500 dark:text-gray-400">Add some delicious treats!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize?.name}`} className="flex space-x-4 border-b dark:border-gray-700 pb-4">
                  <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0">
                    {item.product.image_url && (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.product.name}</h3>
                    {item.selectedSize && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.selectedSize.name}</p>
                    )}
                    <p className="text-[#FAC107] font-bold mt-1">
                      ${(item.selectedSize?.price || item.product.price).toFixed(2)}
                    </p>
                    <div className="flex items-center space-x-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded touch-manipulation dark:text-white"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium min-w-[2rem] text-center dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded touch-manipulation dark:text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-gray-400 dark:text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t dark:border-gray-700 p-4 sm:p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex justify-between items-center mb-4">
              <span className="text-base sm:text-lg font-semibold dark:text-white">Subtotal</span>
              <span className="text-xl sm:text-2xl font-bold text-[#FAC107]">${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={checkout}
              disabled={isCheckingOut}
              className="w-full bg-black dark:bg-gray-700 text-white py-3 sm:py-4 rounded-lg font-bold hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors mb-2 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full border-2 border-black dark:border-gray-600 text-black dark:text-white py-3 sm:py-4 rounded-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation"
            >
              Continue Shopping
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
              🔒 Secure checkout • Free pickup available
            </p>
          </div>
        )}
      </div>
    </>
  );
}
