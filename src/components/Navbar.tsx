import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(current > 10);

    if (shouldReduceMotion) {
      setHidden(false);
      return;
    }

    if (current > previous && current > 80) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) setHidden(false);
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Projects', path: '/projects' },
    { name: 'Sponsors', path: '/sponsors' },
    { name: 'Committee', path: '/committee' },
    { name: 'Instagram', path: '/instagram' },
    { name: 'Contact', path: '/contact' },
  ];

  const hideNav = hidden && !isOpen;

  return (
    <motion.nav
      animate={
        shouldReduceMotion
          ? undefined
          : {
              y: hideNav ? '-100%' : 0,
              opacity: hideNav ? 0 : 1,
            }
      }
      transition={{ type: 'spring', bounce: 0, visualDuration: 0.35 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        hideNav ? 'pointer-events-none' : ''
      } ${
        scrolled
          ? 'bg-slate-900/90 backdrop-blur-lg shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
      aria-hidden={hideNav}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-2 lg:space-x-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative px-1 lg:px-2 py-1 font-medium text-sm lg:text-base transition-colors ${
                location.pathname === link.path ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {location.pathname === link.path && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"
                  transition={{ type: 'spring', bounce: 0.2, visualDuration: 0.4 }}
                />
              )}
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-lg shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`py-3 px-4 text-lg font-medium rounded-md transition-colors ${
                    location.pathname === link.path
                      ? 'bg-blue-500/20 text-white'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
