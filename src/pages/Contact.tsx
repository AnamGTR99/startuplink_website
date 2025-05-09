import React, { useState } from 'react';
import { Send, Mail, MessageSquare, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; description: string; index: number }> = ({ 
  icon, title, description, index 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-panel p-6"
    >
      <div className="flex items-start">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-3 rounded-lg mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <main className="pt-28">
      <section className="section">
        <div className="container mx-auto px-4">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-300">
              Have questions or want to collaborate? We'd love to hear from you!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <InfoCard
                icon={<Mail size={24} className="text-white" />}
                title="Email Us"
                description="info@startuplinkunimelb.net"
                index={1}
              />
              <InfoCard
                icon={<MessageSquare size={24} className="text-white" />}
                title="Follow Us"
                description="Connect with us on LinkedIn and Instagram"
                index={2}
              />
              <InfoCard
                icon={<Users size={24} className="text-white" />}
                title="Join Our Community"
                description="Become a member and join our vibrant community of student entrepreneurs"
                index={3}
              />
              
              {/* Event Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-lg overflow-hidden h-64 mt-6"
              >
                <img 
                  src="/src/assets/test3.JPG"
                  alt="Startup Link Melbourne Event"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-panel p-8"
              >
                <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                
                {isSuccess && (
                  <div className="mb-6 p-4 bg-green-400/10 border border-green-400/20 rounded-md text-green-400">
                    Your message has been sent successfully! We'll get back to you soon.
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/5 border ${
                          errors.name ? 'border-red-500' : 'border-white/10'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/5 border ${
                          errors.email ? 'border-red-500' : 'border-white/10'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 border ${
                        errors.subject ? 'border-red-500' : 'border-white/10'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      placeholder="How can we help you?"
                    />
                    {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full px-4 py-3 bg-white/5 border ${
                        errors.message ? 'border-red-500' : 'border-white/10'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none`}
                      placeholder="Your message here..."
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn-primary w-full flex items-center justify-center ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={18} className="ml-2" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="section bg-slate-950/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="mb-6">Join Our Community</h2>
            <p className="text-xl text-gray-300 mb-8">
              Become a member of Startup Link Melbourne and unlock a world of opportunities, connections, and resources.
            </p>
            <a 
              href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/8055/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Become a Member <ArrowRight size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;