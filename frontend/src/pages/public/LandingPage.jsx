import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HeartIcon, 
  UserGroupIcon, 
  ClockIcon, 
  ShieldCheckIcon,
  StarIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: CalendarDaysIcon,
      title: 'Easy Appointment Booking',
      description: 'Book appointments with your preferred doctors at your convenience. Our smart scheduling system helps you find the best available slots.'
    },
    {
      icon: DocumentTextIcon,
      title: 'Digital Medical Records',
      description: 'Access your complete medical history, prescriptions, and lab results securely from anywhere. All your health information in one place.'
    },
    {
      icon: UserGroupIcon,
      title: 'Expert Healthcare Team',
      description: 'Connect with qualified doctors, nurses, and healthcare professionals. Our verified medical team ensures quality care for all patients.'
    },
    {
      icon: ClockIcon,
      title: '24/7 Healthcare Support',
      description: 'Get round-the-clock support for medical emergencies and consultations. Our healthcare system is always ready to assist you.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure & Private',
      description: 'Your medical data is protected with enterprise-grade security. We follow strict HIPAA compliance to ensure your privacy.'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Telemedicine Ready',
      description: 'Consult with doctors remotely through our integrated video calling system. Quality healthcare from the comfort of your home.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Patient',
      content: 'Prescripto has made managing my health so much easier. I can book appointments, access my records, and even have virtual consultations.',
      rating: 5
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Cardiologist',
      content: 'As a doctor, I appreciate how Prescripto streamlines patient management. The EMR system is intuitive and helps me provide better care.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Patient',
      content: 'The prescription management feature is fantastic. I never miss my medications now, and the pharmacy integration is seamless.',
      rating: 5
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Patients' },
    { number: '500+', label: 'Qualified Doctors' },
    { number: '50,000+', label: 'Appointments Completed' },
    { number: '99.9%', label: 'Uptime Guarantee' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold font-heading mb-6">
                Your Health, Our 
                <span className="text-yellow-300"> Priority</span>
              </h1>
              <p className="text-xl text-gray-100 mb-8 leading-relaxed">
                Experience seamless healthcare management with Prescripto. Book appointments, 
                access medical records, and connect with healthcare professionals all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {!isAuthenticated ? (
                  <>
                    <Link to="/register" className="btn btn-lg bg-white text-primary-600 hover:bg-gray-100">
                      Get Started Today
                    </Link>
                    <Link to="/login" className="btn btn-lg border-white text-white hover:bg-white/10">
                      Login
                    </Link>
                  </>
                ) : (
                  <Link 
                    to={`/${user.role}/dashboard`} 
                    className="btn btn-lg bg-white text-primary-600 hover:bg-gray-100"
                  >
                    Go to Dashboard
                  </Link>
                )}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <img 
                  src="/images/hero-doctor.jpg" 
                  alt="Healthcare Professional" 
                  className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto"
                />
                <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-3">
                    <HeartIcon className="h-8 w-8 text-red-500" />
                    <div>
                      <p className="font-semibold">24/7 Care</p>
                      <p className="text-sm text-gray-600">Always here for you</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6"
              >
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-bold font-heading text-gray-900 mb-4"
            >
              Why Choose Prescripto?
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive healthcare solutions designed to make your medical journey smoother and more efficient.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover-lift"
              >
                <div className="card-body">
                  <feature.icon className="h-12 w-12 text-primary-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-bold font-heading text-gray-900 mb-4"
            >
              What Our Users Say
            </motion.h2>
            <p className="text-xl text-gray-600">
              Real feedback from patients and healthcare professionals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="card-body">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold font-heading mb-6">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Join thousands of patients and healthcare professionals who trust Prescripto for their medical needs.
            </p>
            {!isAuthenticated ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="btn btn-lg bg-white text-primary-600 hover:bg-gray-100">
                  Start Your Journey
                </Link>
                <Link to="/doctors" className="btn btn-lg border-white text-white hover:bg-white/10">
                  Find Doctors
                </Link>
              </div>
            ) : (
              <Link 
                to={`/${user.role}/dashboard`} 
                className="btn btn-lg bg-white text-primary-600 hover:bg-gray-100"
              >
                Access Your Dashboard
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
export default LandingPage;