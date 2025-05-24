import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Calendar, Star, ChevronDown, Utensils, Camera, X, Navigation, Phone, Clock } from 'lucide-react';

// Custom hooks for animations and scroll
const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return scrollY;
};

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);
  
  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1, ...options });
    
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);
  
  return [setRef, isVisible];
};

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
        >
          <X size={20} className="text-gray-600" />
        </button>
        {children}
      </div>
    </div>
  );
};

// Map Component
const MapView = ({ location, name }) => {
  return (
    <div className="w-full h-80 bg-gray-100 rounded-2xl overflow-hidden relative">
      <iframe
        src={`https://maps.google.com/maps?q=${encodeURIComponent(name + ', ' + location.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-2xl"
        title={`Map showing ${name}`}
      />
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <MapPin size={16} className="text-blue-600" />
          <span>{location.address}</span>
        </div>
      </div>
    </div>
  );
};

// Components
const FloatingIcon = ({ icon, delay = 0, className = '' }) => {
  const style = {
    animation: `float 6s ease-in-out infinite`,
    animationDelay: `${delay}s`,
  };
  
  return (
    <div 
      className={`absolute text-4xl text-white/60 pointer-events-none ${className}`}
      style={style}
    >
      {icon}
    </div>
  );
};

const Card = ({ children, className = '', ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={`
        bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 border border-blue-100
        relative overflow-hidden group cursor-pointer
        ${isHovered ? 'transform -translate-y-2 scale-105 shadow-2xl shadow-blue-200/30' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      {children}
    </div>
  );
};

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "px-8 py-4 rounded-full font-semibold transition-all duration-300 inline-flex items-center gap-2";
  const variants = {
    primary: "bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-lg hover:shadow-xl hover:-translate-y-1",
    secondary: "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Navbar = () => {
  const scrollY = useScrollAnimation();
  const isVisible = scrollY > 300;
  
  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-white/95 
        transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🇬🇷 Our Greece Adventure
        </div>
        <div className="text-2xl">💕</div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const scrollY = useScrollAnimation();
  
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background with parallax */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-pink-600"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url("https://ionian-cruises.com/wp-content/uploads/2018/04/Corfu-Boat-Trips-1.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
      
      {/* Floating elements */}
      <div>
        <FloatingIcon icon="💙" delay={0} className="top-1/4 left-1/12" />
        <FloatingIcon icon="🌊" delay={2} className="top-3/5 left-3/4" />
        <FloatingIcon icon="☀️" delay={4} className="top-1/3 right-1/4" />
        <FloatingIcon icon="🏛️" delay={1} className="top-2/3 left-1/5" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent animate-fade-in-up">
          Our Greek Escape
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up-delay">
          A romantic journey through ancient wonders and azure seas
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-2">
          <Button onClick={() => scrollToSection('restaurants')}>
            <Utensils size={20} />
            Discover Our Adventure
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-white/70" />
      </div>
      
      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-24 fill-white">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"/>
        </svg>
      </div>
    </section>
  );
};

const SectionHeader = ({ title, subtitle }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div 
      ref={ref}
      className={`text-center mb-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h2>
      {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}
    </div>
  );
};

const RestaurantCard = ({ emoji, name, description, rating = 5, delay = 0, location, hours, phone, priceRange }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <div
        ref={ref}
        className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <Card onClick={() => setIsModalOpen(true)}>
          <div className="text-5xl mb-4">{emoji}</div>
          <h3 className="text-2xl font-bold mb-3 text-gray-800">{name}</h3>
          <div className="flex items-center mb-3">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} size={18} className="text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-gray-600">({rating}.0)</span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-blue-600">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm">View on map</span>
            </div>
            <div className="text-sm font-semibold text-green-600">{priceRange}</div>
          </div>
        </Card>
      </div>

      {/* Restaurant Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="text-6xl">{emoji}</div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{name}</h2>
              <div className="flex items-center mb-4">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
                <span className="ml-3 text-gray-600 text-lg">({rating}.0) • {priceRange}</span>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">{description}</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock size={20} className="text-blue-600" />
                  Hours
                </h3>
                <div className="space-y-2 text-gray-700">
                  {hours?.map((hour, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{hour.day}</span>
                      <span>{hour.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Phone size={20} className="text-blue-600" />
                  Contact
                </h3>
                <p className="text-gray-700">{phone}</p>
                <button className="mt-2 text-blue-600 hover:text-blue-700 transition-colors">
                  Call Restaurant
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Navigation size={20} className="text-blue-600" />
                Location
              </h3>
              <MapView location={location} name={name} />
              <button className="mt-4 w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Navigation size={16} />
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

const ActivityCard = ({ emoji, name, description, type, delay = 0, location, duration, bestTime }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <div
        ref={ref}
        className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <Card onClick={() => setIsModalOpen(true)}>
          <div className="text-5xl mb-4">{emoji}</div>
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {type}
            </span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-blue-600">
              <Camera size={16} className="mr-1" />
              <span className="text-sm">Photo spot</span>
            </div>
            <Heart size={20} className="text-pink-400 hover:text-pink-500 cursor-pointer transition-colors" />
          </div>
        </Card>
      </div>

      {/* Activity Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="text-6xl">{emoji}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-gray-900">{name}</h2>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {type}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">{description}</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock size={20} className="text-blue-600" />
                  Details
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best Time:</span>
                    <span className="font-medium">{bestTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium">{type}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Camera size={20} className="text-pink-600" />
                  Photo Opportunities
                </h3>
                <p className="text-gray-700">Perfect for romantic photos and memorable moments together!</p>
                <button className="mt-3 text-pink-600 hover:text-pink-700 transition-colors flex items-center gap-1">
                  <Heart size={16} />
                  Add to favorites
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Navigation size={20} className="text-blue-600" />
                Location
              </h3>
              <MapView location={location} name={name} />
              <button className="mt-4 w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Navigation size={16} />
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

const Restaurants = () => {
  const restaurants = [
    {
      emoji: "🐙",
      name: "Taverna Ouzeri",
      description: "Authentic Greek seafood overlooking the Aegean Sea. Famous for their grilled octopus and fresh fish caught daily by local fishermen. The sunset views from their terrace are absolutely magical.",
      rating: 5,
      priceRange: "€€€",
      phone: "+30 22860 71730",
      location: {
        address: "Oia, Santorini, Greece"
      },
      hours: [
        { day: "Monday", time: "6:00 PM - 11:00 PM" },
        { day: "Tuesday", time: "6:00 PM - 11:00 PM" },
        { day: "Wednesday", time: "6:00 PM - 11:00 PM" },
        { day: "Thursday", time: "6:00 PM - 11:00 PM" },
        { day: "Friday", time: "6:00 PM - 12:00 AM" },
        { day: "Saturday", time: "6:00 PM - 12:00 AM" },
        { day: "Sunday", time: "6:00 PM - 11:00 PM" }
      ]
    },
    {
      emoji: "🥙",
      name: "Souvlaki Paradise",
      description: "The best souvlaki in Athens! This family-run taverna has been serving traditional Greek wraps for three generations. Don't miss their lamb souvlaki with tzatziki and warm pita.",
      rating: 5,
      priceRange: "€€",
      phone: "+30 210 384 5978",
      location: {
        address: "Plaka, Athens, Greece"
      },
      hours: [
        { day: "Monday", time: "12:00 PM - 11:00 PM" },
        { day: "Tuesday", time: "12:00 PM - 11:00 PM" },
        { day: "Wednesday", time: "12:00 PM - 11:00 PM" },
        { day: "Thursday", time: "12:00 PM - 11:00 PM" },
        { day: "Friday", time: "12:00 PM - 12:00 AM" },
        { day: "Saturday", time: "12:00 PM - 12:00 AM" },
        { day: "Sunday", time: "12:00 PM - 11:00 PM" }
      ]
    },
    {
      emoji: "🧀",
      name: "Feta & Honey",
      description: "A charming rooftop restaurant specializing in traditional Greek cheeses and local honey. Their feta saganaki with thyme honey is a must-try, paired with local wine.",
      rating: 4,
      priceRange: "€€€",
      phone: "+30 210 923 4567",
      location: {
        address: "Monastiraki, Athens, Greece"
      },
      hours: [
        { day: "Monday", time: "5:00 PM - 11:00 PM" },
        { day: "Tuesday", time: "5:00 PM - 11:00 PM" },
        { day: "Wednesday", time: "5:00 PM - 11:00 PM" },
        { day: "Thursday", time: "5:00 PM - 11:00 PM" },
        { day: "Friday", time: "5:00 PM - 12:00 AM" },
        { day: "Saturday", time: "5:00 PM - 12:00 AM" },
        { day: "Sunday", time: "5:00 PM - 11:00 PM" }
      ]
    },
    {
      emoji: "🍷",
      name: "Dionysus Wine Bar",
      description: "Romantic wine bar with an extensive collection of Greek wines. Perfect for our evening dates with views of the Acropolis. Their wine tastings paired with mezze platters are incredible.",
      rating: 5,
      priceRange: "€€€€",
      phone: "+30 210 923 1234",
      location: {
        address: "Acropolis area, Athens, Greece"
      },
      hours: [
        { day: "Monday", time: "Closed" },
        { day: "Tuesday", time: "6:00 PM - 1:00 AM" },
        { day: "Wednesday", time: "6:00 PM - 1:00 AM" },
        { day: "Thursday", time: "6:00 PM - 1:00 AM" },
        { day: "Friday", time: "6:00 PM - 2:00 AM" },
        { day: "Saturday", time: "6:00 PM - 2:00 AM" },
        { day: "Sunday", time: "6:00 PM - 1:00 AM" }
      ]
    }
  ];
  
  return (
    <section id="restaurants" className="py-20 px-6 max-w-6xl mx-auto">
      <SectionHeader 
        title="🍽️ Culinary Delights"
        subtitle="Taste the authentic flavors of Greece together"
      />
      <div className="grid md:grid-cols-2 gap-8">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard
            key={restaurant.name}
            {...restaurant}
            delay={index * 150}
          />
        ))}
      </div>
    </section>
  );
};

const Activities = () => {
  const activities = [
    {
      emoji: "🏛️",
      name: "Acropolis & Parthenon",
      description: "Step back in time at Athens' crown jewel. We'll explore the ancient citadel at sunrise to avoid crowds and capture the golden hour magic.",
      type: "Historical",
      duration: "3-4 hours",
      bestTime: "Early morning",
      location: {
        address: "Acropolis, Athens, Greece"
      }
    },
    {
      emoji: "🌅",
      name: "Santorini Sunset",
      description: "The world's most romantic sunset in Oia. We'll find the perfect spot to watch the sun dip into the Aegean Sea, painting the white buildings in shades of gold and pink.",
      type: "Romantic",
      duration: "2-3 hours",
      bestTime: "Evening",
      location: {
        address: "Oia, Santorini, Greece"
      }
    },
    {
      emoji: "🚤",
      name: "Island Hopping",
      description: "Private boat tour through the Cyclades islands. We'll discover hidden coves, swim in crystal-clear waters, and explore charming fishing villages.",
      type: "Adventure",
      duration: "Full day",
      bestTime: "Morning departure",
      location: {
        address: "Mykonos Port, Greece"
      }
    },
    {
      emoji: "🏖️",
      name: "Beach Days in Mykonos",
      description: "Relaxing on the pristine beaches of Mykonos. From vibrant beach clubs to secluded romantic spots, we'll find our perfect slice of paradise.",
      type: "Relaxation",
      duration: "Half day",
      bestTime: "Afternoon",
      location: {
        address: "Paradise Beach, Mykonos, Greece"
      }
    },
    {
      emoji: "🎭",
      name: "Ancient Theater Experience",
      description: "Watch a performance at the ancient theater of Epidaurus, famous for its perfect acoustics. An unforgettable cultural experience under the Greek stars.",
      type: "Cultural",
      duration: "4-5 hours",
      bestTime: "Evening",
      location: {
        address: "Epidaurus, Greece"
      }
    },
    {
      emoji: "🛥️",
      name: "Romantic Sailing",
      description: "Private sailing trip around the Greek islands. We'll learn to sail together, enjoy fresh seafood onboard, and anchor in secluded bays for swimming.",
      type: "Romantic",
      duration: "Full day",
      bestTime: "Morning",
      location: {
        address: "Paros Marina, Greece"
      }
    }
  ];
  
  return (
    <section id="activities" className="py-20 px-6 max-w-6xl mx-auto">
      <SectionHeader 
        title="🏛️ Adventures Await"
        subtitle="Create unforgettable memories together"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity, index) => (
          <ActivityCard
            key={activity.name}
            {...activity}
            delay={index * 100}
          />
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-4">Ready for Our Greek Adventure?</h3>
        <p className="text-xl mb-8 opacity-90">Let's make memories that will last a lifetime</p>
        <div className="flex justify-center items-center gap-4 text-4xl mb-8">
          <span>🇬🇷</span>
          <Heart className="text-pink-400 animate-pulse" size={32} />
          <span>💑</span>
        </div>
        <p className="opacity-70">Made with ❤️ for our Greek getaway</p>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <Restaurants />
      <Activities />
      <Footer />
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(-10px) rotate(-5deg); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        .animate-fade-in-up-delay {
          animation: fade-in-up 1s ease-out 0.3s both;
        }
        
        .animate-fade-in-up-delay-2 {
          animation: fade-in-up 1s ease-out 0.6s both;
        }
      `}</style>
    </div>
  );
};

export default App;