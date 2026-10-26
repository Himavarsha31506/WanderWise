import React from 'react';
import { Sparkles, ArrowRight, MapPin, Compass, ShieldCheck, Heart, Plane, Sun, Palmtree, Mountain, Utensils, Landmark } from 'lucide-react';
import { InterestType } from '../types/travel';

interface HeroSectionProps {
  onPlanTrip: (prefillInterest?: InterestType) => void;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onPlanTrip, onExplore }) => {
  const quickCategories: { label: string; icon: any; type: InterestType; color: string }[] = [
    { label: 'Beaches', icon: Palmtree, type: 'beaches', color: 'from-amber-500 to-orange-500' },
    { label: 'Mountains', icon: Mountain, type: 'mountains', color: 'from-cyan-500 to-blue-600' },
    { label: 'Adventure', icon: Compass, type: 'adventure', color: 'from-emerald-500 to-teal-600' },
    { label: 'History', icon: Landmark, type: 'history', color: 'from-purple-500 to-indigo-600' },
    { label: 'Food & Dining', icon: Utensils, type: 'food', color: 'from-rose-500 to-red-600' },
    { label: 'Nature', icon: Sun, type: 'nature', color: 'from-green-500 to-emerald-600' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-sky-900 via-slate-900 to-slate-950 text-white">
      {/* Background imagery with subtle overlay */}
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=80"
          alt="World travel destinations"
          className="w-full h-full object-cover filter blur-[1px]"
        />
      </div>

      {/* Decorative gradient glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-teal-300 shadow-sm animate-fade-in">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>FSD & Machine Learning Integrated Project</span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span className="hidden sm:inline-block text-slate-300 font-normal">Content-Based ML Engine</span>
          </div>

          {/* Heading (Exact requirement: "Discover Your Next Adventure!") */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Discover Your <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              Next Adventure!
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Smart tourism recommendations tailored to your interests, budget, and trip duration.
            Powered by vector Cosine Similarity & customized day-wise itineraries.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onPlanTrip()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 via-sky-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white font-bold text-base shadow-lg shadow-teal-500/30 flex items-center justify-center gap-3 group transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Plan My Trip</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExplore}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-base flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer"
            >
              <MapPin className="w-5 h-5 text-sky-400" />
              <span>Explore All Destinations</span>
            </button>
          </div>

          {/* Quick interest chips */}
          <div className="pt-8">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
              Or pick an interest to kickstart your recommendations:
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {quickCategories.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <button
                    key={cat.type}
                    onClick={() => onPlanTrip(cat.type)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-medium text-slate-200 hover:text-white transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    <IconComponent className="w-4 h-4 text-teal-300" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feature highlights badge row */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10 mt-8">
            <div className="p-3 text-left bg-white/5 rounded-xl border border-white/5 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                <Plane className="w-4 h-4" /> 15+ Curated Spots
              </div>
              <p className="text-[11px] text-slate-400 mt-1">India & International top destinations</p>
            </div>

            <div className="p-3 text-left bg-white/5 rounded-xl border border-white/5 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" /> ML Cosine Similarity
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Content-based vector matching</p>
            </div>

            <div className="p-3 text-left bg-white/5 rounded-xl border border-white/5 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" /> Budget Transparency
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Cost estimation per day & trip</p>
            </div>

            <div className="p-3 text-left bg-white/5 rounded-xl border border-white/5 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <Heart className="w-4 h-4" /> Day-Wise Itineraries
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Customizable morning to night plans</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
