import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  isPast: boolean;
}

const eventData: Event[] = [
  {
    id: 1,
    title: "Spark Tank TedX & Startup Link Pitch night",
    date: "May 14, 2025",
    time: "5:30 PM - 7:30 PM",
    location: "TBC",
    description: "Join us for an exciting evening where student entrepreneurs pitch their startup ideas to a panel of industry experts and investors.",
    imageUrl: "/assets/spark_tank.png",
    isPast: true
  },
  {
    id: 2,
    title: "Tech Founders Fireside Chat",
    date: "July 2, 2025",
    time: "5:30 PM - 7:30 PM",
    location: "Virtual Event",
    description: "Hear from successful tech founders about their journey, challenges, and insights into building successful startups.",
    imageUrl: "/assets/test1.jpg",
    isPast: true
  },
  {
    id: 3,
    title: "Startup Networking Mixer",
    date: "July 18, 2025",
    time: "7:00 PM - 10:00 PM",
    location: "Startup Victoria HQ, Melbourne CBD",
    description: "Network with fellow entrepreneurs, investors, and industry professionals in a relaxed setting. Great opportunity to make valuable connections.",
    imageUrl: "/assets/test2.JPEG",
    isPast: true
  },
  {
    id: 4,
    title: "Entrepreneurship Workshop Series",
    date: "May 10, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "Business School, University of Melbourne",
    description: "A full-day workshop covering essential aspects of entrepreneurship, from ideation to market validation and pitching.",
    imageUrl: "/assets/test3.JPG",
    isPast: true
  },
  {
    id: 5,
    title: "Venture Capital Panel Discussion",
    date: "April 25, 2025",
    time: "4:00 PM - 6:00 PM",
    location: "Innovation Hub, University of Melbourne",
    description: "Learn about venture capital funding from a panel of VCs and angel investors who will share insights on what they look for in startups.",
    imageUrl: "https://placehold.co/600x400/1e293b/e2e8f0?text=VC+Panel",
    isPast: true
  },
  {
    id: 6,
    title: "Startup Law & Compliance Session",
    date: "April 8, 2025",
    time: "5:30 PM - 7:00 PM",
    location: "Law Building, University of Melbourne",
    description: "Expert lawyers will discuss key legal considerations for startups, including company formation, IP protection, and compliance issues.",
    imageUrl: "https://placehold.co/600x400/1e293b/e2e8f0?text=Startup+Law",
    isPast: true
  }
];

const EventCard: React.FC<{ event: Event; index: number }> = ({ event, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group"
    >
      <div className="relative overflow-hidden h-60">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {event.isPast && (
          <div className="absolute top-0 right-0 bg-gray-900/80 text-white px-4 py-2 text-sm">
            Past Event
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-400">
            <Calendar size={16} className="mr-2" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <Clock size={16} className="mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <MapPin size={16} className="mr-2" />
            <span>{event.location}</span>
          </div>
        </div>
        <p className="text-gray-400 mb-4">{event.description}</p>
        <button 
          className={`btn ${event.isPast ? 'btn-secondary' : 'btn-primary'} w-full`}
          disabled={event.isPast}
        >
          {event.isPast ? 'View Details' : 'Register Now'}
        </button>
      </div>
    </motion.div>
  );
};

const StayTunedMessage: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-8 text-center"
    >
      <h3 className="text-2xl font-semibold mb-4">STAY TUNED FOR 2025 Semester 2</h3>
      <p className="text-gray-400">We're preparing exciting events for the upcoming semester. Check back soon for updates!</p>
    </motion.div>
  );
};

const Events: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredEvents = eventData.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return !event.isPast;
    if (filter === 'past') return event.isPast;
    return true;
  });

  return (
    <main className="pt-28">
      <section className="section pb-8">
        <div className="container mx-auto px-4">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="mb-6">Events</h1>
            <p className="text-xl text-gray-300">
              Join us at our upcoming events or check out what you missed.
            </p>
          </motion.div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 rounded-lg bg-slate-800/50 border border-white/10">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-md transition-colors ${
                  filter === 'all' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-6 py-2 rounded-md transition-colors ${
                  filter === 'upcoming' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter('past')}
                className={`px-6 py-2 rounded-md transition-colors ${
                  filter === 'past' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Past Events
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filter === 'upcoming' ? (
              <div className="col-span-full">
                <StayTunedMessage />
              </div>
            ) : (
              filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Subscribe to Events Section */}
      <section className="section bg-slate-950/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">Never Miss an Event</h2>
            <p className="text-xl text-gray-300 mb-8">
              Subscribe to our newsletter to stay updated with our latest events and opportunities.
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Events;