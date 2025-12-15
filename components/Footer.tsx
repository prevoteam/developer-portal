import React from 'react';
import { Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <Layers className="h-6 w-6 text-gray-600" />
          <span className="text-lg font-bold text-gray-500">GRA API CONNECT</span>
        </div>
        <div className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} GRA API Connect. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-gray-600 hover:text-white transition-colors">Privacy</a>
          <a href="#" className="text-gray-600 hover:text-white transition-colors">Terms</a>
          <a href="#" className="text-gray-600 hover:text-white transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
};