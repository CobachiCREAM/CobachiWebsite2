import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { STEMInquiry } from '../types';
import { GraduationCap, Beaker, Lightbulb, Users, CheckCircle, BookOpen, Microscope, FlaskConical } from 'lucide-react';
import FAQ from '../components/FAQ';

export default function STEM() {
  const [formData, setFormData] = useState<STEMInquiry>({
    school_name: '',
    contact_name: '',
    email: '',
    phone: '',
    grade_level: '',
    student_count: 0,
    budget: '',
    preferred_dates: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('stem_inquiries')
        .insert([{ ...formData, status: 'pending' }]);

      if (error) throw error;

      setSubmitted(true);
      setFormData({
        school_name: '',
        contact_name: '',
        email: '',
        phone: '',
        grade_level: '',
        student_count: 0,
        budget: '',
        preferred_dates: '',
        message: '',
      });
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqItems = [
    {
      question: "What age groups do you teach?",
      answer: "We offer programs for all grade levels from elementary (K-5) through high school (9-12). Each program is tailored to the appropriate age group with concepts and activities designed for their developmental level."
    },
    {
      question: "How long is a typical STEM session?",
      answer: "Most sessions are 60-90 minutes, which includes introduction, hands-on activities, and wrap-up. We can adjust the length based on your school's schedule and needs."
    },
    {
      question: "Is this aligned with educational standards?",
      answer: "Yes! Our programs support Next Generation Science Standards (NGSS) and incorporate chemistry, physics, math, and entrepreneurship concepts. We can provide specific learning objectives upon request."
    },
    {
      question: "Do students get to eat what they make?",
      answer: "Absolutely! One of the best parts of our program is that students get to enjoy their delicious experiments. We ensure all food safety standards are met."
    },
    {
      question: "How many students can participate at once?",
      answer: "We typically accommodate classes of 20-30 students, but can handle larger groups by scheduling multiple sessions or bringing additional instructors. Contact us to discuss your specific needs."
    },
    {
      question: "What space requirements do you need?",
      answer: "We need a classroom or cafeteria space with access to electricity and tables for student workstations. We bring all equipment and supplies. A sink nearby is helpful but not required."
    },
    {
      question: "Do you accommodate food allergies?",
      answer: "Yes, we take allergies very seriously. Please inform us of any student allergies in advance, and we'll provide safe alternatives and take necessary precautions."
    },
    {
      question: "Can this be part of our curriculum or just a special event?",
      answer: "Both! Many schools book us for special events like STEM weeks or field trip alternatives, while others integrate our programs into their regular curriculum. We're flexible to meet your educational goals."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[700px] overflow-hidden bg-gradient-to-br from-green-500 via-blue-500 to-purple-600">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/8500567/pexels-photo-8500567.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Students in STEM class"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-24 h-24 bg-[#FAC107] rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-pink-300 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 h-full flex items-center relative z-10 pt-8">
          <div className="max-w-4xl">
            <div className="grid grid-cols-4 gap-3 mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center justify-center border border-white/30 transform hover:scale-110 transition-transform">
                <Beaker className="w-8 h-8 text-white" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center justify-center border border-white/30 transform hover:scale-110 transition-transform" style={{ animationDelay: '0.1s' }}>
                <FlaskConical className="w-8 h-8 text-white" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center justify-center border border-white/30 transform hover:scale-110 transition-transform" style={{ animationDelay: '0.2s' }}>
                <Microscope className="w-8 h-8 text-white" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center justify-center border border-white/30 transform hover:scale-110 transition-transform" style={{ animationDelay: '0.3s' }}>
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Learn Science Through
              <br />
              <span className="text-[#FAC107]">Ice Cream</span>
            </h1>

            <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl">
              Hands-on STEM education that's actually delicious. From chemistry to entrepreneurship, we teach real-world skills through the art of making ice cream.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 transform hover:scale-105 transition-transform">
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">500+</p>
                <p className="text-sm text-gray-700 font-semibold">Students Taught</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 transform hover:scale-105 transition-transform">
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">K-12</p>
                <p className="text-sm text-gray-700 font-semibold">All Grade Levels</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 transform hover:scale-105 transition-transform">
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">100%</p>
                <p className="text-sm text-gray-700 font-semibold">Hands-On</p>
              </div>
            </div>

            <button
              onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-flex items-center space-x-2 shadow-xl"
            >
              <BookOpen className="w-5 h-5" />
              <span>Book a STEM Experience</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold mb-6">Born from STEM, Built for Education</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Cobachi C.R.E.A.M. started as a student project in a STEM class. Today, we bring that same educational
              spirit to schools across Georgia, teaching students about science through the delicious art of ice cream making.
            </p>
            <div className="bg-gradient-to-r from-[#FAC107] to-yellow-400 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-2">Over 500 Students Taught</h3>
              <p className="text-gray-900">
                We've inspired hundreds of students across elementary, middle, and high schools throughout Georgia.
              </p>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
            <img
              src="https://images.pexels.com/photos/5428010/pexels-photo-5428010.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Students learning in classroom"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">STEM in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl group h-[350px]">
              <img
                src="https://images.pexels.com/photos/8612988/pexels-photo-8612988.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Students conducting science experiment"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white">Hands-On Learning</h3>
                <p className="text-white text-sm">Students actively participate in every step</p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl group h-[350px]">
              <img
                src="https://images.pexels.com/photos/5905465/pexels-photo-5905465.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Teacher at whiteboard giving math instruction"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white">Expert Instruction</h3>
                <p className="text-white text-sm">Our team guides students through concepts</p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl group h-[350px]">
              <img
                src="https://images.pexels.com/photos/6936085/pexels-photo-6936085.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Students laughing together while working in classroom"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white">Fun & Educational</h3>
                <p className="text-white text-sm">Learning science has never been so delicious</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <Beaker className="w-12 h-12 text-[#FAC107] mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">States of Matter</h3>
            <p className="text-sm text-gray-600">Observe liquid-to-solid transitions in real-time</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <FlaskConical className="w-12 h-12 text-[#FAC107] mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Chemical Reactions</h3>
            <p className="text-sm text-gray-600">Learn about temperature and freezing points</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <Microscope className="w-12 h-12 text-[#FAC107] mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Scientific Method</h3>
            <p className="text-sm text-gray-600">Experiment with flavors and ingredients</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <Lightbulb className="w-12 h-12 text-[#FAC107] mx-auto mb-4" />
            <h3 className="font-bold text-base sm:text-lg mb-2 break-words">Entrepreneurship</h3>
            <p className="text-sm text-gray-600">Learn how STEM leads to business opportunities</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-black to-gray-900 text-white rounded-2xl p-8 md:p-12 mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">What Students Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-[#FAC107] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">Physics & Chemistry</h4>
                  <p className="text-sm text-gray-300">Temperature, phase changes, and molecular structure</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-[#FAC107] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">Math & Measurements</h4>
                  <p className="text-sm text-gray-300">Ratios, proportions, and precise measurements</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-[#FAC107] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">Cultural Education</h4>
                  <p className="text-sm text-gray-300">Exploring flavors from around the world</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-[#FAC107] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-1">Business Skills</h4>
                  <p className="text-sm text-gray-300">From concept to customer satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Program Details</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <BookOpen className="w-6 h-6 text-[#FAC107]" />
                  <h3 className="font-bold text-xl">Elementary School (K-5)</h3>
                </div>
                <p className="text-gray-600">
                  Introduction to basic science concepts through ice cream. Focus on observation, measurement, and following directions.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Beaker className="w-6 h-6 text-[#FAC107]" />
                  <h3 className="font-bold text-xl">Middle School (6-8)</h3>
                </div>
                <p className="text-gray-600">
                  Deeper dive into chemistry and physics. Students conduct experiments and document findings scientifically.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <GraduationCap className="w-6 h-6 text-[#FAC107]" />
                  <h3 className="font-bold text-xl">High School (9-12)</h3>
                </div>
                <p className="text-gray-600">
                  Advanced concepts including food science, entrepreneurship, and the business of STEM innovation.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl">
            <h2 className="text-2xl font-bold mb-2">Book a STEM Experience</h2>
            <p className="text-gray-600 mb-6">
              Bring Cobachi's educational ice cream program to your school
            </p>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Inquiry Received!</h3>
                <p className="text-gray-600">
                  We'll review your request and contact you within 2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-bold mb-2 text-sm">School/Organization Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.school_name}
                    onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#FAC107] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-2 text-sm">Contact Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.contact_name}
                      onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#FAC107] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-2 text-sm">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#FAC107] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-2 text-sm">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#FAC107] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-2 text-sm">Grade Level *</label>
                    <select
                      required
                      value={formData.grade_level}
                      onChange={(e) => setFormData({ ...formData, grade_level: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#FAC107] focus:outline-none"
                    >
                      <option value="">Select level</option>
                      <option value="K-5">Elementary (K-5)</option>
                      <option value="6-8">Middle School (6-8)</option>
                      <option value="9-12">High School (9-12)</option>
                      <option value="mixed">Mixed Ages</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-2 text-sm">Number of Students *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.student_count || ''}
                      onChange={(e) => setFormData({ ...formData, student_count: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#FAC107] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-2 text-sm">Budget *</label>
                    <input
                      type="text"
                      required
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="e.g., $500-$1000"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#FAC107] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-2 text-sm">Preferred Dates</label>
                  <input
                    type="text"
                    value={formData.preferred_dates}
                    onChange={(e) => setFormData({ ...formData, preferred_dates: e.target.value })}
                    placeholder="e.g., March 15-20"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#FAC107] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2 text-sm">Additional Details</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#FAC107] focus:outline-none"
                    placeholder="Any specific curriculum goals or requirements?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FAC107] text-black py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="bg-[#FAC107] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">What Teachers Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8">
            <div className="bg-white rounded-xl p-6">
              <div className="flex justify-center items-center mb-3">
                <span className="text-xl sm:text-2xl">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 italic mb-3">
                "My students were completely engaged! They learned about science AND got to eat their experiment."
              </p>
              <p className="font-bold text-sm">- Mrs. Johnson, 5th Grade</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="flex justify-center items-center mb-3">
                <span className="text-xl sm:text-2xl">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 italic mb-3">
                "This brought our chemistry unit to life. The cultural component was an unexpected bonus!"
              </p>
              <p className="font-bold text-sm">- Mr. Davis, Science Teacher</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="flex justify-center items-center mb-3">
                <span className="text-xl sm:text-2xl">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 italic mb-3">
                "Best field trip alternative ever. Educational, fun, and the kids still talk about it months later."
              </p>
              <p className="font-bold text-sm">- Dr. Mitchell, Principal</p>
            </div>
          </div>
        </div>

        <FAQ items={faqItems} />
      </div>
    </div>
  );
}
