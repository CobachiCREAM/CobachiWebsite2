import { useState } from 'react';
import { Gift, CreditCard, Mail, User, MessageSquare } from 'lucide-react';

export default function GiftCard() {
  const [amount, setAmount] = useState<string>('25');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  const predefinedAmounts = ['25', '50', '75', '100'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Gift card purchase:', {
      amount: amount === 'custom' ? customAmount : amount,
      recipientName,
      recipientEmail,
      senderName,
      message,
    });
  };

  const selectedAmount = amount === 'custom' ? customAmount : amount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="relative h-[600px] overflow-hidden bg-gradient-to-br from-[#FAC107] via-yellow-400 to-orange-500">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-purple-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/40">
                  <Gift className="w-5 h-5 text-white" />
                  <span className="text-white font-bold text-sm">Perfect for Any Occasion</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
                  Give the Gift of
                  <br />
                  <span className="text-black">C.R.E.A.M.</span>
                </h1>

                <p className="text-xl text-white mb-8 max-w-xl">
                  Share joy, culture, and delicious memories with digital gift cards. Delivered instantly, redeemable at all locations, and never expire.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="bg-white/30 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/40">
                    <p className="text-2xl font-bold text-white">Instant</p>
                    <p className="text-sm text-white/90">Email Delivery</p>
                  </div>
                  <div className="bg-white/30 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/40">
                    <p className="text-2xl font-bold text-white">No Expiry</p>
                    <p className="text-sm text-white/90">Use Anytime</p>
                  </div>
                </div>

                <button
                  onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-flex items-center space-x-2 shadow-xl"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Purchase Gift Card</span>
                </button>
              </div>

              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl transform rotate-6"></div>
                  <div className="relative bg-gradient-to-br from-white to-gray-100 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform">
                    <div className="text-center">
                      <Gift className="w-16 h-16 text-[#FAC107] mx-auto mb-6" />
                      <h3 className="text-3xl font-bold text-black mb-3">Cobachi C.R.E.A.M.</h3>
                      <p className="text-gray-600 text-lg mb-6">Gift Card</p>
                      <div className="bg-gradient-to-r from-[#FAC107] to-yellow-400 rounded-2xl p-8 mb-6">
                        <p className="text-6xl font-bold text-black mb-2">$50</p>
                        <p className="text-sm text-black/80">Example Value</p>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Valid at all locations</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-pink-50 dark:from-gray-900 to-transparent"></div>
      </div>

      <div className="relative py-16 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">Choose Your Gift Card</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold mb-3 dark:text-white">Select Amount</label>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {predefinedAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setAmount(amt)}
                          className={`py-4 rounded-xl font-bold text-lg transition-all ${
                            amount === amt
                              ? 'bg-[#FAC107] text-black shadow-lg transform scale-105'
                              : 'bg-gray-100 dark:bg-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setAmount('custom')}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                        amount === 'custom'
                          ? 'bg-[#FAC107] text-black shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      Custom Amount
                    </button>
                    {amount === 'custom' && (
                      <div className="mt-3">
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          placeholder="Enter amount"
                          min="10"
                          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-[#FAC107] focus:outline-none"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 dark:text-white">Recipient Information</label>
                    <div className="space-y-3">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          placeholder="Recipient's Name"
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-[#FAC107] focus:outline-none"
                          required
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={recipientEmail}
                          onChange={(e) => setRecipientEmail(e.target.value)}
                          placeholder="Recipient's Email"
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-[#FAC107] focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 dark:text-white">Your Information</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-[#FAC107] focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 dark:text-white">Personal Message (Optional)</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write a special message..."
                        rows={4}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-[#FAC107] focus:outline-none resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FAC107] text-black py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <CreditCard className="w-6 h-6" />
                    <span>Proceed to Payment</span>
                  </button>
                </form>
              </div>

              <div>
                <div className="bg-gradient-to-br from-[#FAC107] to-yellow-400 rounded-3xl shadow-2xl p-8 mb-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="text-center">
                    <Gift className="w-16 h-16 text-black mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-black mb-2">Cobachi C.R.E.A.M.</h3>
                    <p className="text-black text-lg mb-6">Gift Card</p>
                    <div className="bg-white bg-opacity-90 rounded-2xl p-6 mb-4">
                      <p className="text-5xl font-bold text-black mb-2">
                        ${selectedAmount || '0'}
                      </p>
                      <p className="text-sm text-gray-700">Gift Card Value</p>
                    </div>
                    <p className="text-black text-sm">
                      Redeemable at all Cobachi C.R.E.A.M. locations
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6">
                  <h3 className="font-bold text-lg mb-4 dark:text-white">Why Choose Our Gift Cards?</h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#FAC107] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-black text-sm font-bold">✓</span>
                      </div>
                      <span>Delivered instantly via email</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#FAC107] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-black text-sm font-bold">✓</span>
                      </div>
                      <span>Valid at all pick up locations</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#FAC107] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-black text-sm font-bold">✓</span>
                      </div>
                      <span>No expiration date</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#FAC107] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-black text-sm font-bold">✓</span>
                      </div>
                      <span>Perfect for any occasion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
