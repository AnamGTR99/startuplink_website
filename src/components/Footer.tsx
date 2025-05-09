import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, ExternalLink } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto pt-16 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10">
          <div className="space-y-4">
            <Logo className="h-12 w-auto" />
            <p className="text-gray-400 mt-4 max-w-md">
              Connecting Melbourne's brightest student entrepreneurs with industry leaders, resources, and opportunities to turn ideas into reality.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-white transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-gray-400">University of Melbourne</p>
            <p className="text-gray-400">Parkville, VIC 3010</p>
            <p className="text-gray-400">info@startuplinkunimelb.net</p>
          </div>
        </div>
        
        <div className="py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Startup Link Melbourne. All rights reserved.
          </p>
          
          <div className="flex mt-4 md:mt-0 space-x-4 items-center">
            <a
              href="https://www.linkedin.com/company/startuplinkunimelb/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.instagram.com/startuplinkunimelb/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;