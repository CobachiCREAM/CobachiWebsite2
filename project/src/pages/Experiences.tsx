import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Star, Award, Sparkles, Gift, CheckCircle, X, ChevronLeft, ChevronRight, Wine, PartyPopper } from 'lucide-react';
import { supabase } from '../lib/supabase';
import FAQ from '../components/FAQ';

interface ScheduledClass {
  id: string;
  class_type: string;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  capacity: number;
  booked_count: number;
  price_per_person: number;
  description: string;
  is_active: boolean;
}

export default function Experiences() {
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [scheduledClasses, setScheduledClasses] = useState<ScheduledClass[]>([]);
  const [selectedClass, setSelectedClass] = useState<ScheduledClass | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const [bookingFormData, setBookingFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    number_of_participants: 1,
    special_requests: ''
  });

  const [generalFormData, setGeneralFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    number_of_participants: 1,
    preferred_date: '',
    preferred_time: '',
    age_group: 'adults',
    special_requests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const featuredExperiences = [
    {
      id: 'errybody',
      title: "Errybody Get ya Roll on",
      icon: PartyPopper,
      description: "Join our signature ice cream making class where everyone gets hands-on experience creating their own delicious rolled ice cream. Perfect for groups, friends, and anyone who loves a fun culinary adventure!",
      duration: "2 hours",
      participants: "4-12 people",
      price: "$35/person",
      highlights: [
        "Create 2-3 custom ice cream rolls",
        "Learn professional rolling techniques",
        "Choose from premium toppings",
        "Perfect for all ages"
      ],
      gradient: "from-[#FAC107] to-orange-400"
    },
    {
      id: 'roll_n_sip',
      title: "Roll n Sip (21+)",
      icon: Wine,
      description: "An adults-only experience combining the art of rolled ice cream with craft cocktails. Learn to create boozy ice cream creations while enjoying specialty drinks in a sophisticated, fun atmosphere.",
      duration: "2.5 hours",
      participants: "6-15 people",
      price: "$50/person",
      highlights: [
        "Alcohol-infused ice cream creations",
        "Complimentary craft cocktail",
        "Premium ingredients & toppings",
        "Must be 21+ with valid ID"
      ],
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  useEffect(() => {
    if (selectedExperience) {
      fetchScheduledClasses(selectedExperience);
    }
  }, [selectedExperience, currentMonth]);

  const fetchScheduledClasses = async (classType: string) => {
    setIsLoading(true);
    try {
      const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

      const { data, error } = await supabase
        .from('scheduled_classes')
        .select('*')
        .eq('class_type', classType)
        .gte('date', startOfMonth.toISOString().split('T')[0])
        .lte('date', endOfMonth.toISOString().split('T')[0])
        .eq('is_active', true)
        .order('date', { ascending: true });

      if (error) throw error;
      setScheduledClasses(data || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookExperience = (experienceId: string) => {
    setSelectedExperience(experienceId);
    setSelectedClass(null);
    document.getElementById('calendar-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClassSelection = (scheduledClass: ScheduledClass) => {
    setSelectedClass(scheduledClass);
    document.getElementById('booking-details')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const spotsRemaining = selectedClass.capacity - selectedClass.booked_count;
      if (bookingFormData.number_of_participants > spotsRemaining) {
        alert(`Only ${spotsRemaining} spots remaining for this class.`);
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase
        .from('class_bookings')
        .insert([{
          ...bookingFormData,
          scheduled_class_id: selectedClass.id,
          preferred_date: selectedClass.date,
          preferred_time: `${selectedClass.start_time} - ${selectedClass.end_time}`,
          age_group: selectedClass.class_type === 'roll_n_sip' ? 'adults' : 'mixed'
        }]);

      if (error) throw error;

      setSubmitStatus('success');
      setBookingFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        number_of_participants: 1,
        special_requests: ''
      });
      setSelectedClass(null);
      setSelectedExperience(null);
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('class_bookings')
        .insert([generalFormData]);

      if (error) throw error;

      setSubmitStatus('success');
      setGeneralFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        number_of_participants: 1,
        preferred_date: '',
        preferred_time: '',
        age_group: 'adults',
        special_requests: ''
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const getClassesForDay = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return scheduledClasses.filter(c => c.date === dateStr);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const classOptions = [
    {
      icon: Users,
      title: "Group Classes",
      description: "Perfect for parties, team building, or friend gatherings",
      duration: "2 hours",
      participants: "4-12 people",
      price: "Starting at $35/person"
    },
    {
      icon: Gift,
      title: "Private Sessions",
      description: "One-on-one or small group personalized instruction",
      duration: "1.5 hours",
      participants: "1-4 people",
      price: "Starting at $50/person"
    },
    {
      icon: Sparkles,
      title: "Kids Birthday Parties",
      description: "Fun, educational ice cream making party experience",
      duration: "2 hours",
      participants: "Up to 15 kids",
      price: "Starting at $300"
    },
    {
      icon: Award,
      title: "Corporate Events",
      description: "Team building through culinary creativity",
      duration: "2-3 hours",
      participants: "10+ people",
      price: "Custom pricing"
    }
  ];

  const benefits = [
    "Learn the science behind rolled ice cream",
    "Hands-on experience with professional equipment",
    "Create your own custom flavor combinations",
    "All ingredients and supplies included",
    "Take home recipes and techniques",
    "Fun for all ages and skill levels"
  ];

  const faqItems = [
    {
      question: "Do I need any prior experience to take a class?",
      answer: "Not at all! Our classes are designed for all skill levels, from complete beginners to those looking to refine their technique. Our instructors provide step-by-step guidance throughout the entire experience."
    },
    {
      question: "What should I bring to the class?",
      answer: "Just bring yourself and your appetite! We provide all ingredients, equipment, aprons, and supplies. You're welcome to bring a camera to capture the fun moments."
    },
    {
      question: "Can I book a private class for my group?",
      answer: "Absolutely! We offer private classes for groups of 4 or more. This is perfect for birthday parties, team building, bachelorette parties, or any special celebration. Contact us to customize your private experience."
    },
    {
      question: "What is your cancellation policy?",
      answer: "You can cancel or reschedule up to 48 hours before your class for a full refund. Cancellations within 48 hours are non-refundable, but we'll do our best to help you reschedule to another available date."
    },
    {
      question: "Are classes suitable for children?",
      answer: "Yes! Our 'Errybody Get ya Roll on' classes welcome all ages. Children under 12 should be accompanied by an adult. Our 'Roll n Sip' classes are exclusively for guests 21+ with valid ID."
    },
    {
      question: "How many ice cream rolls will I make?",
      answer: "In most classes, you'll create 2-3 ice cream rolls with different flavor combinations. You'll have access to a variety of premium toppings and ingredients to customize each creation."
    },
    {
      question: "Do you accommodate dietary restrictions?",
      answer: "Yes! We can accommodate dairy-free, vegan, gluten-free, and nut-free requirements. Please let us know about any dietary restrictions when booking so we can prepare appropriate ingredients."
    },
    {
      question: "Can I purchase a gift certificate for a class?",
      answer: "Yes! Class gift certificates make wonderful gifts and can be purchased for specific classes or as credit toward any class. Contact us or visit our gift card page to purchase."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-br from-[#FAC107] via-yellow-400 to-orange-400 text-black py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-black/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <p className="font-semibold">Hands-On Learning Experience</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Rolled Ice Cream
              <br />
              <span className="text-white">Making Classes</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Learn to create delicious rolled ice cream while exploring the science and artistry behind this amazing treat
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">1.5-3 Hours</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Users className="w-5 h-5" />
                <span className="font-semibold">All Ages Welcome</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Star className="w-5 h-5" />
                <span className="font-semibold">No Experience Needed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">What You'll Learn</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Our classes combine culinary arts with STEM education, making learning fun and delicious
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <CheckCircle className="w-6 h-6 text-[#FAC107] flex-shrink-0 mt-1" />
                <p className="text-gray-700 font-medium">{benefit}</p>
              </div>
            ))}
          </div>

          <h2 className="text-4xl font-bold text-center mb-4">Featured Experiences</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Choose from our signature classes and book your spot today
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {featuredExperiences.map((experience) => (
              <div key={experience.id} className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all">
                <div className={`bg-gradient-to-br ${experience.gradient} p-8 text-white`}>
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                    <experience.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{experience.title}</h3>
                  <p className="text-white/90 mb-4">{experience.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                      <Clock className="w-4 h-4" />
                      <span>{experience.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                      <Users className="w-4 h-4" />
                      <span>{experience.participants}</span>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="mb-6">
                    <h4 className="font-bold text-lg mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {experience.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-[#FAC107] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600">Price per person</p>
                      <p className="text-3xl font-bold text-[#FAC107]">{experience.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleBookExperience(experience.id)}
                    className="w-full bg-gradient-to-r from-[#FAC107] to-yellow-400 text-black font-bold py-4 px-8 rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-4xl font-bold text-center mb-12">Custom Class Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {classOptions.map((option) => (
              <div key={option.title} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FAC107] to-yellow-400 rounded-full flex items-center justify-center mb-4">
                  <option.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{option.title}</h3>
                <p className="text-gray-600 mb-6">{option.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4 h-4 text-[#FAC107]" />
                    <span>{option.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="w-4 h-4 text-[#FAC107]" />
                    <span>{option.participants}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-2xl font-bold text-[#FAC107]">{option.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedExperience && (
            <div id="calendar-section" className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-4xl font-bold mb-2">Select Your Class Date</h2>
                  <p className="text-xl text-gray-600">
                    {featuredExperiences.find(e => e.id === selectedExperience)?.title}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <h3 className="text-2xl font-bold">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-semibold text-sm text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {getDaysInMonth().map((day, index) => {
                    if (!day) {
                      return <div key={`empty-${index}`} className="aspect-square"></div>;
                    }

                    const classesForDay = getClassesForDay(day);
                    const hasClasses = classesForDay.length > 0;

                    return (
                      <div
                        key={day}
                        className={`aspect-square border rounded-lg p-2 ${
                          hasClasses
                            ? 'border-[#FAC107] bg-yellow-50 cursor-pointer hover:bg-yellow-100'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="text-sm font-semibold mb-1">{day}</div>
                        {hasClasses && (
                          <div className="text-xs text-[#FAC107] font-semibold">
                            {classesForDay.length} class{classesForDay.length > 1 ? 'es' : ''}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Loading available classes...</p>
                </div>
              ) : scheduledClasses.length > 0 ? (
                <div>
                  <h3 className="text-2xl font-bold mb-6">Available Classes This Month</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scheduledClasses.map((scheduledClass) => {
                      const spotsLeft = scheduledClass.capacity - scheduledClass.booked_count;
                      return (
                        <div
                          key={scheduledClass.id}
                          className="border border-gray-200 rounded-lg p-6 hover:border-[#FAC107] hover:shadow-md transition-all cursor-pointer"
                          onClick={() => handleClassSelection(scheduledClass)}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <p className="text-lg font-bold">{formatDate(scheduledClass.date)}</p>
                              <p className="text-gray-600">
                                {formatTime(scheduledClass.start_time)} - {formatTime(scheduledClass.end_time)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-[#FAC107]">
                                ${scheduledClass.price_per_person}
                              </p>
                              <p className="text-sm text-gray-600">per person</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-semibold ${spotsLeft <= 3 ? 'text-red-600' : 'text-green-600'}`}>
                              {spotsLeft} spots left
                            </p>
                            <button className="bg-[#FAC107] text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-400 transition-colors">
                              Select
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No classes available this month. Check back soon or contact us for custom bookings!</p>
                </div>
              )}
            </div>
          )}

          {selectedClass && (
            <div id="booking-details" className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-20">
              <h2 className="text-4xl font-bold mb-8 text-center">Complete Your Booking</h2>

              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Class Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Experience</p>
                    <p className="font-semibold">{selectedClass.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="font-semibold">
                      {formatDate(selectedClass.date)} at {formatTime(selectedClass.start_time)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold">
                      {formatTime(selectedClass.start_time)} - {formatTime(selectedClass.end_time)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Price Per Person</p>
                    <p className="font-semibold text-[#FAC107] text-xl">
                      ${selectedClass.price_per_person}
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleBookingSubmit} className="max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="booking_customer_name" className="block text-sm font-semibold mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="booking_customer_name"
                      value={bookingFormData.customer_name}
                      onChange={(e) => setBookingFormData({...bookingFormData, customer_name: e.target.value})}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking_customer_email" className="block text-sm font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="booking_customer_email"
                      value={bookingFormData.customer_email}
                      onChange={(e) => setBookingFormData({...bookingFormData, customer_email: e.target.value})}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking_customer_phone" className="block text-sm font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="booking_customer_phone"
                      value={bookingFormData.customer_phone}
                      onChange={(e) => setBookingFormData({...bookingFormData, customer_phone: e.target.value})}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking_number_of_participants" className="block text-sm font-semibold mb-2">
                      Number of Participants *
                    </label>
                    <input
                      type="number"
                      id="booking_number_of_participants"
                      value={bookingFormData.number_of_participants}
                      onChange={(e) => setBookingFormData({...bookingFormData, number_of_participants: parseInt(e.target.value) || 1})}
                      min="1"
                      max={selectedClass.capacity - selectedClass.booked_count}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="booking_special_requests" className="block text-sm font-semibold mb-2">
                      Special Requests or Dietary Restrictions
                    </label>
                    <textarea
                      id="booking_special_requests"
                      value={bookingFormData.special_requests}
                      onChange={(e) => setBookingFormData({...bookingFormData, special_requests: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FAC107] focus:border-transparent resize-none"
                      placeholder="Let us know if you have any dietary restrictions, allergies, or special requests..."
                    ></textarea>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold">Total Cost:</span>
                    <span className="text-3xl font-bold text-[#FAC107]">
                      ${(selectedClass.price_per_person * bookingFormData.number_of_participants).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {bookingFormData.number_of_participants} participant{bookingFormData.number_of_participants > 1 ? 's' : ''} × ${selectedClass.price_per_person}
                  </p>
                </div>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    <p className="font-semibold">Booking submitted successfully!</p>
                    <p className="text-sm mt-1">We'll send you a confirmation email shortly.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    <p className="font-semibold">There was an error submitting your booking.</p>
                    <p className="text-sm mt-1">Please try again or contact us directly.</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedClass(null)}
                    className="flex-1 bg-gray-200 text-gray-800 font-bold py-4 px-8 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-[#FAC107] to-yellow-400 text-black font-bold py-4 px-8 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div id="general-inquiry-form" className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">Custom Class Inquiry</h2>
              <p className="text-xl text-gray-600">
                Don't see what you're looking for? Fill out the form below and we'll create a custom experience for you
              </p>
            </div>

            <form onSubmit={handleGeneralSubmit} className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="customer_name" className="block text-sm font-semibold mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="customer_name"
                    name="customer_name"
                    value={generalFormData.customer_name}
                    onChange={(e) => setGeneralFormData({...generalFormData, customer_name: e.target.value})}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="customer_email" className="block text-sm font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="customer_email"
                    name="customer_email"
                    value={generalFormData.customer_email}
                    onChange={(e) => setGeneralFormData({...generalFormData, customer_email: e.target.value})}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="customer_phone" className="block text-sm font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="customer_phone"
                    name="customer_phone"
                    value={generalFormData.customer_phone}
                    onChange={(e) => setGeneralFormData({...generalFormData, customer_phone: e.target.value})}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="general_number_of_participants" className="block text-sm font-semibold mb-2">
                    Number of Participants *
                  </label>
                  <input
                    type="number"
                    id="general_number_of_participants"
                    value={generalFormData.number_of_participants}
                    onChange={(e) => setGeneralFormData({...generalFormData, number_of_participants: parseInt(e.target.value) || 1})}
                    min="1"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="preferred_date" className="block text-sm font-semibold mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="preferred_date"
                    name="preferred_date"
                    value={generalFormData.preferred_date}
                    onChange={(e) => setGeneralFormData({...generalFormData, preferred_date: e.target.value})}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="preferred_time" className="block text-sm font-semibold mb-2">
                    Preferred Time *
                  </label>
                  <select
                    id="preferred_time"
                    name="preferred_time"
                    value={generalFormData.preferred_time}
                    onChange={(e) => setGeneralFormData({...generalFormData, preferred_time: e.target.value})}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                  >
                    <option value="">Select a time</option>
                    <option value="morning">Morning (9am - 12pm)</option>
                    <option value="afternoon">Afternoon (12pm - 4pm)</option>
                    <option value="evening">Evening (4pm - 8pm)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="age_group" className="block text-sm font-semibold mb-2">
                    Age Group *
                  </label>
                  <select
                    id="age_group"
                    name="age_group"
                    value={generalFormData.age_group}
                    onChange={(e) => setGeneralFormData({...generalFormData, age_group: e.target.value})}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FAC107] focus:border-transparent"
                  >
                    <option value="kids">Kids (5-12 years)</option>
                    <option value="teens">Teens (13-17 years)</option>
                    <option value="adults">Adults (18+ years)</option>
                    <option value="mixed">Mixed Ages</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="special_requests" className="block text-sm font-semibold mb-2">
                    Special Requests or Dietary Restrictions
                  </label>
                  <textarea
                    id="special_requests"
                    name="special_requests"
                    value={generalFormData.special_requests}
                    onChange={(e) => setGeneralFormData({...generalFormData, special_requests: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FAC107] focus:border-transparent resize-none"
                    placeholder="Let us know if you have any dietary restrictions, allergies, or special requests..."
                  ></textarea>
                </div>
              </div>

              {submitStatus === 'success' && !selectedClass && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  <p className="font-semibold">Inquiry submitted successfully!</p>
                  <p className="text-sm mt-1">We'll contact you within 24 hours to discuss your custom class.</p>
                </div>
              )}

              {submitStatus === 'error' && !selectedClass && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  <p className="font-semibold">There was an error submitting your inquiry.</p>
                  <p className="text-sm mt-1">Please try again or contact us directly.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#FAC107] to-yellow-400 text-black font-bold py-4 px-8 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                * Required fields
              </p>
            </form>
          </div>
        </div>

        <div className="bg-gradient-to-br from-black to-gray-900 text-white rounded-2xl p-8 md:p-12 text-center mt-20">
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            We're here to help! Contact us for custom packages, group rates, or any questions about our classes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-[#FAC107] text-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="tel:+1234567890"
              className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white/20 transition-colors"
            >
              Call Us Now
            </a>
          </div>
        </div>

        <FAQ items={faqItems} />
      </div>
    </div>
  );
}
