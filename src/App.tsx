import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';

// Pages
import Home from './pages/Home';
import Events from './pages/Events';
import Projects from './pages/Projects';
import Sponsors from './pages/Sponsors';
import Committee from './pages/Committee';
import Instagram from './pages/Instagram';
import Contact from './pages/Contact';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/committee" element={<Committee />} />
            <Route path="/instagram" element={<Instagram />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}

export default App;