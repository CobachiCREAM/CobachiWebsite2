import { Link } from 'react-router-dom';
import { Heart, Award, Users, GraduationCap, Sparkles, Target, TrendingUp, Calendar, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function About() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const milestones = [
    { year: '2021', event: 'Born from a STEM class project', icon: GraduationCap },
    { year: '2022', event: 'Started attending festivals and pop up events', icon: Calendar },
    { year: '2023', event: 'Launched our catering services', icon: Users },
    { year: '2024', event: 'Won pitch competition with NMSDC', icon: Award },
    { year: '2025', event: 'Launched our Freezer and Wholesale program', icon: TrendingUp },
    { year: '2026', event: 'Brick and Mortar coming soon', icon: Sparkles },
  ];

  const faqs = [
    {
      question: 'What makes Cobachi C.R.E.A.M. different from regular ice cream?',
      answer: 'We use the Thai ice cream technique where fresh ingredients are mixed and frozen on a -20°F cold plate right before your eyes. This creates a smoother texture and allows for creative, customizable combinations that celebrate cultural flavas.'
    },
    {
      question: 'Do you offer vegan or dairy-free options?',
      answer: 'Yes! We offer several vegan options made with coconut milk and other plant-based ingredients. Just ask our staff about current vegan flavas available.'
    },
    {
      question: 'Can I book Cobachi for a private event?',
      answer: 'Absolutely! We specialize in catering for weddings, corporate events, school functions, and private parties. Visit our Catering page to submit a request, and we\'ll get back to you within 48 hours with pricing and availability.'
    },
    {
      question: 'What is the STEM education program?',
      answer: 'Our STEM program teaches students about science, technology, engineering, and math through the fun lens of ice cream making. Students learn about states of matter, temperature, food science, and entrepreneurship. We offer both in-school programs and field trips to our locations.'
    },
    {
      question: 'How long does ice cream take to make?',
      answer: 'Each order takes about 3-5 minutes to prepare. We make every order fresh, so you can watch the entire process from start to finish!'
    },
    {
      question: 'Can I order online for pickup or delivery?',
      answer: 'Yes! Visit our Shop page to browse products and place orders. We offer local delivery, pickup, and shipping options for select items.'
    },
    {
      question: 'What are your most popular flavas?',
      answer: 'Our bestsellers include Like Mike, The Minaj, Gold Digger, and Twisted Savage Crunch. We also rotate seasonal and specialty flavas inspired by various cultural traditions.'
    },
    {
      question: 'Do you have gift cards available?',
      answer: 'Yes! Gift cards are available for purchase on our website, making them perfect gifts for ice cream lovers.'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Culture',
      description: 'Every flava celebrates our heritage and tells a story rooted in tradition and community.'
    },
    {
      icon: Sparkles,
      title: 'Creativity',
      description: 'We push boundaries with innovative flavas and presentations that surprise and delight.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Giving back is at our core. We support local initiatives and create opportunities for youth.'
    },
    {
      icon: GraduationCap,
      title: 'STEM',
      description: 'Education through experience. We inspire the next generation of scientists and entrepreneurs.'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[600px] overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Ice cream variety"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-[#FAC107]/90 via-yellow-400/80 to-orange-500/90"></div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-16 right-20 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-24 left-24 w-40 h-40 bg-black rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <div>
              <div className="inline-flex items-center space-x-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Heart className="w-5 h-5 text-black" />
                <span className="text-black font-bold text-sm">Family-Owned • Culture-Driven</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-black leading-tight">
                Our Story:
                <br />
                <span className="text-white">From Classroom to Community</span>
              </h1>

              <p className="text-xl text-black mb-8 max-w-xl">
                What started as a STEM project has grown into a movement celebrating culture, education, and bringing communities together through the universal language of delicious ice cream.
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="bg-black/20 backdrop-blur-sm rounded-xl px-5 py-3 border border-black/20">
                  <p className="text-2xl font-bold text-black">2021</p>
                  <p className="text-sm text-black">Founded</p>
                </div>
                <div className="bg-black/20 backdrop-blur-sm rounded-xl px-5 py-3 border border-black/20">
                  <p className="text-2xl font-bold text-black">100+</p>
                  <p className="text-sm text-black">Students</p>
                </div>
                <div className="bg-black/20 backdrop-blur-sm rounded-xl px-5 py-3 border border-black/20">
                  <p className="text-2xl font-bold text-black">100%</p>
                  <p className="text-sm text-black">Black-Owned</p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-transform">
                    <GraduationCap className="w-10 h-10 text-[#FAC107] mb-3" />
                    <h3 className="font-bold text-lg mb-2">STEM Education</h3>
                    <p className="text-sm text-gray-700">Teaching through ice cream</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-transform">
                    <Users className="w-10 h-10 text-[#FAC107] mb-3" />
                    <h3 className="font-bold text-lg mb-2">Community First</h3>
                    <p className="text-sm text-gray-700">Giving back locally</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-transform">
                    <Heart className="w-10 h-10 text-[#FAC107] mb-3" />
                    <h3 className="font-bold text-lg mb-2">Cultural Pride</h3>
                    <p className="text-sm text-gray-700">Celebrating heritage</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-transform">
                    <Award className="w-10 h-10 text-[#FAC107] mb-3" />
                    <h3 className="font-bold text-lg mb-2">Excellence</h3>
                    <p className="text-sm text-gray-700">Quality in every roll</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
              <h2 className="text-3xl font-bold mb-6">Where It All Began</h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  Cobachi C.R.E.A.M. didn't start in a commercial kitchen or business plan. It started in a classroom,
                  as part of a STEM project where students were challenged to create something innovative that combined
                  science with entrepreneurship.
                </p>
                <p>
                  What began as an experiment in understanding states of matter and chemical reactions through ice cream
                  making became something much bigger. The ice cream technique fascinated students and teachers
                  alike, and the cultural flavas we created resonated deeply with our community.
                </p>
                <p>
                  We realized we had created more than just a product — we had created an experience that brought people
                  together, celebrated our heritage, and taught valuable lessons about science and business. That's when
                  Cobachi C.R.E.A.M. was truly born.
                </p>
                <p>
                  Today, we're proud to serve our community from two locations while staying true to our educational roots.
                  Every ice cream we create, every catering event we host, and every STEM class we teach carries
                  forward that original mission: to inspire, educate, and celebrate culture through the universal language
                  of delicious food.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
                <img
                  src="/3b3012e4-1469-4f71-9829-b46807e2a436_1_201_a.jpeg"
                  alt="CEO preparing ice cream"
                  className="w-72 h-72 object-cover"
                />
              </div>
              <div className="bg-gradient-to-r from-[#FAC107] to-yellow-400 rounded-2xl p-8 shadow-lg flex-1">
                <h3 className="text-3xl font-bold mb-3">Meet Our Founder</h3>
                <p className="text-2xl font-bold mb-3">Patty Jackson</p>
                <p className="text-lg text-gray-900">
                  Passionate about education, entrepreneurship, and creating experiences that bring communities together through the art of ice cream.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-[#FAC107] rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-black to-gray-900 text-white rounded-2xl p-8 md:p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex items-start space-x-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#FAC107] rounded-full flex items-center justify-center flex-shrink-0">
                    <milestone.icon className="w-8 h-8 text-black" />
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-1 h-full bg-[#FAC107] mt-2"></div>
                  )}
                </div>
                <div className="pt-3">
                  <p className="text-[#FAC107] font-bold text-2xl mb-1">{milestone.year}</p>
                  <p className="text-xl text-gray-300">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-[#FAC107] rounded-2xl p-8 text-center">
            <p className="text-5xl font-bold mb-2">100+</p>
            <p className="text-lg font-semibold">Students Educated</p>
          </div>
          <div className="bg-black text-white rounded-2xl p-8 text-center">
            <p className="text-5xl font-bold text-[#FAC107] mb-2">50+</p>
            <p className="text-lg font-semibold">Events Catered</p>
          </div>
          <div className="bg-[#FAC107] rounded-2xl p-8 text-center">
            <p className="text-5xl font-bold mb-2">100%</p>
            <p className="text-lg font-semibold">Black-Owned</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg text-center mb-20">
          <Target className="w-16 h-16 text-[#FAC107] mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Our Commitment</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            We're committed to celebrating culture, supporting education, and building community one scoop at a time.
            Every purchase supports our mission to inspire the next generation of innovators and entrepreneurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-[#FAC107] text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-400 transition-colors"
            >
              Shop Our Flavas
            </Link>
            <Link
              to="/stem"
              className="border-2 border-black text-black px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Learn About STEM Classes
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-center text-gray-600 mb-12">Everything you need to know about Cobachi C.R.E.A.M.</p>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-lg pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-6 h-6 text-[#FAC107] flex-shrink-0 transition-transform ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
