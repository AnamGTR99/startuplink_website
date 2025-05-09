import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Lightbulb, Network, CalendarClock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="glass-panel p-8 hover:bg-white/10 transition-all duration-500"
    >
      <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-3 rounded-lg mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const ImageSection: React.FC<{
  image: string;
  title: string;
  description: string;
  index: number;
}> = ({ image, title, description, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Link to="/events">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        className="relative overflow-hidden rounded-2xl glass-panel group cursor-pointer"
      >
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-300">{description}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const Home: React.FC = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950"></div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30"
          >
            <source src="https://cdn.coverr.co/videos/coverr-typing-on-computer-2433/1080p.mp4" type="video/mp4" />
          </video>
        </div>
        
        <div className="container mx-auto px-4 pt-28 pb-20 md:pt-40 md:pb-32 relative z-10">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 font-bold mb-6"
            >
              Connecting Students with Startup Opportunities
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Melbourne's premier university society bridging the gap between student entrepreneurs and the startup ecosystem.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/events" className="btn-primary">
                Upcoming Events <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Get Involved
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <ArrowRight size={24} className="transform rotate-90 text-gray-400" />
          </div>
        </motion.div>
      </section>

      {/* Recent Events Section */}
      <section className="py-24 bg-slate-950/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Recent Events</h2>
            <p className="text-xl text-gray-300">Experience the vibrant community of student entrepreneurs at our events.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ImageSection
              image="/src/assets/test1.jpg"
              title="Startup Fair 2024"
              description="Students networking and sharing ideas at our recent startup fair, fostering connections within the entrepreneurial community."
              index={0}
            />
            <ImageSection
              image="/src/assets/test2.JPEG"
              title="Spicy Startup Trivia"
              description="Testing our members knowledge of startup with a twist, Buldak Extra Spicy Noodles."
              index={1}
            />
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section ref={aboutRef} className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What We Do</h2>
            <p className="text-xl text-gray-300">
              We believe in the power of student entrepreneurship and innovation to shape the future.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Lightbulb size={24} className="text-white" />}
              title="Innovation Hub"
              description="A space where ideas flourish, supported by mentorship, resources, and collaborative opportunities."
              delay={1}
            />
            <FeatureCard
              icon={<Network size={24} className="text-white" />}
              title="Industry Connections"
              description="Direct access to Melbourne's startup ecosystem, venture capitalists, and industry experts."
              delay={2}
            />
            <FeatureCard
              icon={<Users size={24} className="text-white" />}
              title="Community Building"
              description="Fostering a vibrant community of like-minded student entrepreneurs across disciplines."
              delay={3}
            />
            <FeatureCard
              icon={<CalendarClock size={24} className="text-white" />}
              title="Events & Workshops"
              description="Regular events featuring successful founders, skill-building workshops, and networking opportunities."
              delay={4}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="glass-panel p-10 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-400/20 animate-gradient-x"></div>
            
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to join Melbourne's most innovative student community?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Whether you're a budding entrepreneur, a tech enthusiast, or simply curious about the startup world, we welcome you to be part of Startup Link Melbourne.
              </p>
              <Link to="/contact" className="btn-primary">
                Get in Touch <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;