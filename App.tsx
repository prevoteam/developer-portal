import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ApiEndpoints } from './components/ApiEndpoints';
import { AIStrategist } from './components/AIStrategist';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'api'>('home');

  return (
    <div className="min-h-screen bg-gra-dark text-white selection:bg-gra-highlight selection:text-black flex flex-col">
      <Navbar 
        onNavigate={(view) => setCurrentView(view)} 
        currentView={currentView}
      />
      
      <main className="flex-grow">
        {currentView === 'home' ? (
          <>
            <Hero />
            <Features />
            <AIStrategist />
            <section id="contact" className="py-24 bg-gradient-to-b from-gra-card to-black text-center px-6">
               <div className="max-w-3xl mx-auto">
                 <h2 className="text-4xl font-bold mb-6">Ready to Evolve?</h2>
                 <p className="text-gray-400 mb-8 text-lg">
                   Join the forward-thinking enterprises that are redefining their industries with GRA API Connect.
                 </p>
                 <button className="px-10 py-5 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-200 transition-colors">
                   Schedule Consultation
                 </button>
               </div>
            </section>
          </>
        ) : (
          <ApiEndpoints />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;