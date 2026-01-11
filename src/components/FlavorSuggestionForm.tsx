import { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function FlavorSuggestionForm() {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    flavor_name: '',
    description: '',
    inspiration: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('flavor_suggestions')
        .insert([formData]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        customer_name: '',
        customer_email: '',
        flavor_name: '',
        description: '',
        inspiration: '',
      });

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting flavor suggestion:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="suggest-flavor" className="py-16 bg-gradient-to-br from-yellow-50 via-white to-pink-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="flex flex-col justify-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#FAC107] rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-300 rounded-full opacity-20 blur-2xl"></div>

                <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px]">
                  <img
                    src="https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Delicious rolled ice cream"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Your Idea Could Be Our Next Hit Flava!
                    </h3>
                    <p className="text-white text-sm md:text-base">
                      We love creating flavors inspired by our community. Share your unique ideas and you might see them on our menu!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-[#FAC107] rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Suggest a Flava</h2>
                    <p className="text-gray-600 text-sm">Got a flavor idea? Share it with us!</p>
                  </div>
                </div>

                {submitStatus === 'success' && (
                  <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl">
                    Thanks for your suggestion! We'll review it and may reach out to you.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
                    Something went wrong. Please try again later.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="customer_name" className="block text-sm font-bold text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="customer_name"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FAC107] focus:outline-none transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="customer_email" className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="customer_email"
                      name="customer_email"
                      value={formData.customer_email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FAC107] focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="flavor_name" className="block text-sm font-bold text-gray-700 mb-2">
                      Flavor Name *
                    </label>
                    <input
                      type="text"
                      id="flavor_name"
                      name="flavor_name"
                      value={formData.flavor_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FAC107] focus:outline-none transition-colors"
                      placeholder="Give your flavor a catchy name"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2">
                      Flavor Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FAC107] focus:outline-none transition-colors resize-none"
                      placeholder="What ingredients and flavors would be in it?"
                    />
                  </div>

                  <div>
                    <label htmlFor="inspiration" className="block text-sm font-bold text-gray-700 mb-2">
                      What Inspired This? (Optional)
                    </label>
                    <textarea
                      id="inspiration"
                      name="inspiration"
                      value={formData.inspiration}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FAC107] focus:outline-none transition-colors resize-none"
                      placeholder="A memory, tradition, or cultural connection..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FAC107] text-black px-6 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 touch-manipulation"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Submit Your Flava</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
