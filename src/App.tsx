/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DESTINATIONS_DATA } from './data/destinations';
import { Destination, User, UserPreferences, RecommendationResult, UserTrip, InterestType } from './types/travel';
import { recommendDestinations } from './services/mlRecommender';
import { StorageService } from './services/storageService';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PlanTripSection } from './components/PlanTripSection';
import { ExploreView } from './components/ExploreView';
import { MyTripsView } from './components/MyTripsView';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { AuthModal } from './components/AuthModal';
import { CollegeVivaGuideModal } from './components/CollegeVivaGuideModal';
import { VectorMathModal } from './components/VectorMathModal';
import { Footer } from './components/Footer';
import { Sparkles, ArrowRight, Star, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'plan' | 'trips' | 'guide'>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const [preferences, setPreferences] = useState<UserPreferences>({
    interests: ['beaches', 'adventure'],
    budget: 'medium',
    durationDays: 4,
    location: 'all',
  });

  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [savedDestinationIds, setSavedDestinationIds] = useState<string[]>([]);
  const [userTrips, setUserTrips] = useState<UserTrip[]>([]);

  const [selectedDetailDest, setSelectedDetailDest] = useState<Destination | null>(null);
  const [isVivaGuideOpen, setIsVivaGuideOpen] = useState(false);
  const [inspectedMathResult, setInspectedMathResult] = useState<RecommendationResult | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const user = StorageService.getUser();
    if (user) setCurrentUser(user);
    setSavedDestinationIds(StorageService.getSavedDestinationIds());
    setUserTrips(StorageService.getUserTrips());
    setRecommendations(recommendDestinations(preferences, DESTINATIONS_DATA));
  }, []);

  const handleCalculateRecommendations = (newPrefs: UserPreferences) => {
    setPreferences(newPrefs);
    const recs = recommendDestinations(newPrefs, DESTINATIONS_DATA);
    setRecommendations(recs);
    showToast(`Calculated ${recs.length} ML recommendations!`);
  };

  const handleToggleSave = (destId: string) => {
    const updated = StorageService.toggleSaveDestination(destId);
    setSavedDestinationIds(updated);
    const dest = DESTINATIONS_DATA.find(d => d.id === destId);
    if (updated.includes(destId)) {
      showToast(`Saved ${dest?.name || 'destination'} to your bucket list! ❤️`);
    } else {
      showToast(`Removed from saved list.`);
    }
  };

  const handleCreateTripFromDest = (dest: Destination) => {
    const newTrip = StorageService.createTripFromDestination(dest, preferences.durationDays || dest.idealDurationDays);
    const updatedTrips = StorageService.saveUserTrip(newTrip);
    setUserTrips(updatedTrips);
    showToast(`Created ${newTrip.durationDays}-Day Itinerary for ${dest.name}! 🎉`);
    setActiveTab('trips');
    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateTrip = (trip: UserTrip) => {
    setUserTrips(StorageService.saveUserTrip(trip));
    showToast(`Itinerary updated.`);
  };

  const handleDeleteTrip = (tripId: string) => {
    setUserTrips(StorageService.deleteUserTrip(tripId));
    showToast(`Trip itinerary removed.`);
  };

  const handlePlanTripCTA = (prefillInterest?: InterestType) => {
    if (prefillInterest) {
      const updatedPrefs = { ...preferences, interests: [prefillInterest] };
      setPreferences(updatedPrefs);
      setRecommendations(recommendDestinations(updatedPrefs, DESTINATIONS_DATA));
    }
    setActiveTab('plan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const savedDestinations = DESTINATIONS_DATA.filter(d => savedDestinationIds.includes(d.id));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-slate-950">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-teal-500/30 flex items-center gap-2.5 text-xs font-semibold animate-fade-in">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'guide') {
            setIsVivaGuideOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        currentUser={currentUser}
        onOpenAuth={(mode) => {
          setAuthInitialMode(mode);
          setIsAuthModalOpen(true);
        }}
        onLogout={() => {
          StorageService.setUser(null);
          setCurrentUser(null);
          showToast('Signed out successfully.');
        }}
        savedCount={savedDestinationIds.length}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-16 sm:space-y-24 pb-20">
            
            <HeroSection
              onPlanTrip={handlePlanTripCTA}
              onExplore={() => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Trending Tourist Destinations */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
                    Handpicked Highlights
                  </span>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight mt-2">
                    Trending Tourist Destinations
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Top-rated travel spots across India and international retreats
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('explore');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 group cursor-pointer"
                >
                  <span>Explore all 15+ spots</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {DESTINATIONS_DATA.slice(0, 3).map((dest) => {
                  const isSaved = savedDestinationIds.includes(dest.id);
                  const cost = currency === 'INR' ? dest.avgCostPerDayINR : dest.avgCostPerDayUSD;
                  const currencySymbol = currency === 'INR' ? '₹' : '$';

                  return (
                    <div
                      key={dest.id}
                      className="bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-800 hover:border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 flex flex-col group cursor-pointer backdrop-blur-md"
                      onClick={() => setSelectedDetailDest(dest)}
                    >
                      <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                        <img
                          src={dest.imageUrl}
                          alt={dest.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-950/80 backdrop-blur-md text-slate-200 border border-slate-700/60">
                            {dest.region === 'india' ? '🇮🇳 India' : '✈️ International'}
                          </span>
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-400 text-slate-950 flex items-center gap-1 shadow-xs">
                            <Star className="w-3 h-3 fill-slate-950" /> {dest.rating}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleSave(dest.id);
                          }}
                          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/80 text-slate-300 hover:text-rose-500 border border-slate-700/60 flex items-center justify-center shadow-md hover:scale-110 cursor-pointer"
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? 'text-rose-500 fill-rose-500' : 'text-slate-300'}`} />
                        </button>

                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <span className="text-teal-400 text-[11px] uppercase font-bold block">
                            {dest.stateOrCity}, {dest.country}
                          </span>
                          <h3 className="text-xl font-bold tracking-tight text-white drop-shadow-md">
                            {dest.name}
                          </h3>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-slate-300">
                        <div>
                          <p className="text-xs text-slate-400 line-clamp-1 italic mb-2">"{dest.tagline}"</p>
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{dest.description}</p>
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {dest.interests.map(i => (
                              <span key={i} className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-800 text-slate-300 capitalize border border-slate-700/60">
                                #{i}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-slate-500 block text-[10px]">Avg Cost</span>
                            <span className="font-extrabold text-white text-sm">
                              {currencySymbol}{cost.toLocaleString()}
                              <span className="text-[10px] text-slate-400 font-normal"> /day</span>
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-500 block text-[10px]">Ideal Stay</span>
                            <span className="font-bold text-teal-400 text-xs">{dest.idealDurationDays} Days</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDetailDest(dest);
                            }}
                            className="w-full py-2 px-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs cursor-pointer"
                          >
                            Details & Season
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCreateTripFromDest(dest);
                            }}
                            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                          >
                            <span>Plan Itinerary</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* How ML Engine Works Section */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 py-16 sm:py-20 border-y border-slate-800/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>How WanderWise Works</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Smart Recommendations Powered by ML
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    A Content-Based Recommender System using vector dot product & Cosine Similarity
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 text-teal-300 flex items-center justify-center font-black text-lg">
                      1
                    </div>
                    <h3 className="text-lg font-bold text-white">Your Travel Preferences</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Choose your travel passions (beaches, mountains, adventure, history, food), budget level, duration, and preferred location.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/30 text-sky-300 flex items-center justify-center font-black text-lg">
                      2
                    </div>
                    <h3 className="text-lg font-bold text-white">Cosine Similarity Matching</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      The ML algorithm builds user vector <code className="text-teal-300 font-mono">u</code> and calculates cosine angle <code className="text-teal-300 font-mono">Cos(θ) = (u·d)/(||u||·||d||)</code> against destination feature vectors <code className="text-teal-300 font-mono">d</code>.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-center font-black text-lg">
                      3
                    </div>
                    <h3 className="text-lg font-bold text-white">Custom Itinerary & Budget</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Receive ranked recommendations with transparent Explainable AI reasons, budget calculations, and day-by-day itineraries.
                    </p>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <button
                    onClick={() => handlePlanTripCTA()}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-sky-600 text-slate-950 font-black text-sm shadow-xl shadow-teal-500/20 hover:scale-105 transition-transform cursor-pointer inline-flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Try the ML Recommender Now</span>
                  </button>
                </div>
              </div>
            </div>

            {/* College Project Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-teal-950/30 via-slate-900 to-amber-950/20 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                <div className="space-y-2 text-center md:text-left">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                    College Lab & Viva Ready
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    Presenting this for your college submission or viva?
                  </h3>
                  <p className="text-xs text-slate-400 max-w-xl">
                    Access complete Python Flask source code, scikit-learn ML scripts, SQLite queries, step-by-step mathematical calculations, and viva questions.
                  </p>
                </div>

                <button
                  onClick={() => setIsVivaGuideOpen(true)}
                  className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shrink-0 flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-102 transition-transform cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Open Viva & Code Guide</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: EXPLORE */}
        {activeTab === 'explore' && (
          <ExploreView
            destinations={DESTINATIONS_DATA}
            currency={currency}
            savedIds={savedDestinationIds}
            onToggleSave={handleToggleSave}
            onViewDetails={(dest) => setSelectedDetailDest(dest)}
            onPlanTripWithDestination={handleCreateTripFromDest}
            onOpenRecommender={() => {
              setActiveTab('plan');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* TAB 3: PLAN */}
        {activeTab === 'plan' && (
          <PlanTripSection
            onCalculateRecommendations={handleCalculateRecommendations}
            recommendations={recommendations}
            preferences={preferences}
            setPreferences={setPreferences}
            currency={currency}
            savedIds={savedDestinationIds}
            onToggleSave={handleToggleSave}
            onViewDetails={(dest) => setSelectedDetailDest(dest)}
            onSelectForItinerary={handleCreateTripFromDest}
            onInspectMath={(result) => setInspectedMathResult(result)}
          />
        )}

        {/* TAB 4: TRIPS */}
        {activeTab === 'trips' && (
          <MyTripsView
            savedDestinations={savedDestinations}
            userTrips={userTrips}
            currency={currency}
            onRemoveSaved={handleToggleSave}
            onViewDetails={(dest) => setSelectedDetailDest(dest)}
            onCreateTripFromDest={handleCreateTripFromDest}
            onUpdateTrip={handleUpdateTrip}
            onDeleteTrip={handleDeleteTrip}
            onNavigateToExplore={() => setActiveTab('explore')}
          />
        )}

      </main>

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          if (tab === 'guide') {
            setIsVivaGuideOpen(true);
          } else {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenGuide={() => setIsVivaGuideOpen(true)}
      />

      {/* Destination Detail Modal */}
      <DestinationDetailModal
        destination={selectedDetailDest}
        onClose={() => setSelectedDetailDest(null)}
        currency={currency}
        isSaved={selectedDetailDest ? savedDestinationIds.includes(selectedDetailDest.id) : false}
        onToggleSave={handleToggleSave}
        onPlanTripWithDestination={handleCreateTripFromDest}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authInitialMode}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Signed in as ${user.name}!`);
        }}
      />

      {/* College Viva Guide Modal */}
      <CollegeVivaGuideModal
        isOpen={isVivaGuideOpen}
        onClose={() => setIsVivaGuideOpen(false)}
      />

      {/* Vector Math Modal */}
      <VectorMathModal
        result={inspectedMathResult}
        onClose={() => setInspectedMathResult(null)}
      />

    </div>
  );
}
