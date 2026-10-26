import React, { useState } from 'react';
import { Compass, MapPin, Heart, BookOpen, LogOut, Sparkles, Menu, X } from 'lucide-react';
import { User } from '../types/travel';

interface NavbarProps {
  activeTab: 'home' | 'explore' | 'plan' | 'trips' | 'guide';
  setActiveTab: (tab: 'home' | 'explore' | 'plan' | 'trips' | 'guide') => void;
  currentUser: User | null;
  onOpenAuth: (initialMode: 'login' | 'register') => void;
  onLogout: () => void;
  savedCount: number;
  currency: 'INR' | 'USD';
  setCurrency: (c: 'INR' | 'USD') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  onLogout,
  savedCount,
  currency,
  setCurrency,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'explore' | 'plan' | 'trips' | 'guide') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-500 via-sky-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/25 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white group-hover:text-teal-400 transition-colors">
                  Wander<span className="text-teal-400">Wise</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30">
                  <Sparkles className="w-2.5 h-2.5 text-teal-400" /> ML Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">Smart Tourism Planner</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-slate-800/90 text-teal-300 shadow-inner border border-slate-700/60'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('explore')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'explore'
                  ? 'bg-slate-800/90 text-teal-300 shadow-inner border border-slate-700/60'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              Explore
            </button>

            <button
              onClick={() => handleNavClick('plan')}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer relative ${
                activeTab === 'plan'
                  ? 'bg-gradient-to-r from-teal-500 to-sky-600 text-white shadow-lg shadow-teal-500/25'
                  : 'text-teal-300 bg-teal-950/40 border border-teal-500/30 hover:bg-teal-900/40'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Plan My Trip
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute -top-0.5 -right-0.5" />
            </button>

            <button
              onClick={() => handleNavClick('trips')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'trips'
                  ? 'bg-slate-800/90 text-teal-300 shadow-inner border border-slate-700/60'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${savedCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
              My Trips
              {savedCount > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('guide')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                activeTab === 'guide'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'text-amber-400/90 border-amber-500/20 bg-amber-950/20 hover:bg-amber-950/40'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Viva & Code Guide</span>
            </button>
          </div>

          {/* Right Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Currency switcher */}
            <div className="flex items-center bg-slate-900 p-1 rounded-xl text-xs font-bold text-slate-400 border border-slate-800">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  currency === 'INR' ? 'bg-slate-800 text-white shadow-xs' : 'hover:text-white'
                }`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  currency === 'USD' ? 'bg-slate-800 text-white shadow-xs' : 'hover:text-white'
                }`}
              >
                $ USD
              </button>
            </div>

            {/* User Dropdown */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-sky-500 text-white font-bold text-xs flex items-center justify-center overflow-hidden">
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                    ) : (
                      currentUser.name.charAt(0)
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-200 leading-none">{currentUser.name.split(' ')[0]}</p>
                    <p className="text-[10px] text-teal-400 font-medium">Traveler</p>
                  </div>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-2 z-50 text-slate-200">
                    <div className="p-3 border-b border-slate-800 mb-1">
                      <p className="text-xs font-bold text-white">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        handleNavClick('trips');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-xl flex items-center gap-2 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500" /> My Saved Trips
                    </button>
                    <button
                      onClick={() => {
                        handleNavClick('guide');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-xl flex items-center gap-2 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" /> College Viva Guide
                    </button>
                    <div className="border-t border-slate-800 my-1" />
                    <button
                      onClick={() => {
                        onLogout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl transition-all cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl shadow-md shadow-teal-500/20 transition-all hover:scale-102 cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer ${
              activeTab === 'home' ? 'bg-slate-800 text-teal-400' : 'text-slate-300'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('explore')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer ${
              activeTab === 'explore' ? 'bg-slate-800 text-teal-400' : 'text-slate-300'
            }`}
          >
            <MapPin className="w-4 h-4 text-sky-400" /> Explore Destinations
          </button>
          <button
            onClick={() => handleNavClick('plan')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer ${
              activeTab === 'plan' ? 'bg-teal-500/20 text-teal-300' : 'text-teal-400 font-bold'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" /> Plan My Trip (ML Recommender)
          </button>
          <button
            onClick={() => handleNavClick('trips')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer ${
              activeTab === 'trips' ? 'bg-slate-800 text-teal-400' : 'text-slate-300'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500" /> My Trips ({savedCount})
          </button>
          <button
            onClick={() => handleNavClick('guide')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer ${
              activeTab === 'guide' ? 'bg-amber-500/20 text-amber-300' : 'text-amber-400'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-400" /> College Project & Viva Guide
          </button>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-slate-400 text-xs">
            <span>Currency</span>
            <div className="flex gap-1 bg-slate-900 p-1 rounded-lg">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-2 py-1 rounded cursor-pointer ${currency === 'INR' ? 'bg-slate-800 text-white font-bold' : ''}`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded cursor-pointer ${currency === 'USD' ? 'bg-slate-800 text-white font-bold' : ''}`}
              >
                $ USD
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
