import React, { useState, useEffect } from 'react';
import { Menu, X, Layers, Database } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: 'home' | 'api') => void;
  currentView: 'home' | 'api';
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Expertise', href: '#features' },
    { name: 'GRA Intelligence', href: '#ai-engine' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('home');
    window.scrollTo(0, 0);
  };

  const handleApiClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('api');
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || currentView === 'api' ? 'bg-gra-dark/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Left Side: Brand + API Catalogue Tab */}
        <div className="flex items-center gap-6">
          <a href="#" onClick={handleLogoClick} className="flex items-center gap-2 group">
            <Layers className="h-8 w-8 text-gra-highlight group-hover:rotate-180 transition-transform duration-700" />
            <span className="text-xl font-bold tracking-tight text-white">GRA API Connect</span>
          </a>
          
          <button 
            onClick={handleApiClick}
            className={`hidden md:flex items-center gap-2 text-sm font-medium transition-colors border-l border-white/20 pl-6 h-6 ${
              currentView === 'api' ? 'text-gra-highlight' : 'text-gray-300 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            API Catalogue
          </button>
        </div>

        {/* Desktop Nav Right */}
        <div className="hidden md:flex items-center gap-8">
          {currentView === 'home' && navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wider hover:border-b border-gra-highlight"
            >
              {link.name}
            </a>
          ))}
          <a href="#ai-engine" onClick={(e) => { if(currentView === 'api') { handleLogoClick(e); setTimeout(() => document.getElementById('ai-engine')?.scrollIntoView(), 100); } }} className="px-5 py-2 bg-white text-gra-dark font-bold text-sm rounded hover:bg-gray-200 transition-colors">
            Get Access
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gra-card border-t border-white/10 p-6 flex flex-col gap-4 shadow-2xl">
          <button 
            onClick={handleApiClick}
            className={`text-lg font-medium flex items-center gap-2 ${currentView === 'api' ? 'text-gra-highlight' : 'text-gray-300'}`}
          >
            <Database className="w-5 h-5" />
            API Catalogue
          </button>
          
          {currentView === 'home' && navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-gray-300 hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};