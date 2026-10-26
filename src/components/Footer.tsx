import React from 'react';
import { Compass, Sparkles, Heart, BookOpen, MapPin, Terminal, Database, Code } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'explore' | 'plan' | 'trips' | 'guide') => void;
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenGuide }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-teal-500 to-emerald-500 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Wander<span className="text-teal-400">Wise</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Smart Tourism Planner & Destination Recommendation System.
              Integrated Full Stack Development (FSD) and Machine Learning project using React, Python Flask, scikit-learn, and SQLite.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900 text-teal-400 border border-slate-800">
                React 19 + Vite
              </span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900 text-sky-400 border border-slate-800">
                Python + scikit-learn
              </span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900 text-amber-400 border border-slate-800">
                SQLite Database
              </span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900 text-rose-400 border border-slate-800">
                Tailwind CSS
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore')}
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Explore Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('plan')}
                  className="hover:text-teal-400 transition-colors cursor-pointer text-teal-300 font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" /> Plan My Trip (ML)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trips')}
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  My Saved Trips & Itinerary
                </button>
              </li>
            </ul>
          </div>

          {/* Academic & College Viva */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">College Presentation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenGuide}
                  className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5 font-bold"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>College Viva & ML Guide</span>
                </button>
              </li>
              <li>
                <span className="text-slate-500">Algorithm: Content-Based Filtering</span>
              </li>
              <li>
                <span className="text-slate-500">Metric: Vector Cosine Similarity</span>
              </li>
              <li>
                <span className="text-slate-500">Persistence: SQLite Database</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} WanderWise – Smart Tourism Planner. Academic FSD + ML Capstone Project.
          </p>
          <p className="flex items-center gap-1 text-[11px]">
            Designed for intuitive travel planning & college viva presentations
          </p>
        </div>

      </div>
    </footer>
  );
};
