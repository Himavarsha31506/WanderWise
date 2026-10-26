import React, { useState } from 'react';
import { Sparkles, Palmtree, Mountain, Compass, Landmark, Utensils, Sun, SlidersHorizontal, RefreshCw, Check, ArrowRight } from 'lucide-react';
import { InterestType, BudgetLevel, LocationPreference, UserPreferences, RecommendationResult, Destination } from '../types/travel';
import { RecommendationCard } from './RecommendationCard';
import confetti from 'canvas-confetti';

interface PlanTripSectionProps {
  onCalculateRecommendations: (prefs: UserPreferences) => void;
  recommendations: RecommendationResult[];
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
  currency: 'INR' | 'USD';
  savedIds: string[];
  onToggleSave: (destId: string) => void;
  onViewDetails: (dest: Destination) => void;
  onSelectForItinerary: (dest: Destination) => void;
  onInspectMath: (result: RecommendationResult) => void;
}

export const PlanTripSection: React.FC<PlanTripSectionProps> = ({
  onCalculateRecommendations,
  recommendations,
  preferences,
  setPreferences,
  currency,
  savedIds,
  onToggleSave,
  onViewDetails,
  onSelectForItinerary,
  onInspectMath,
}) => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [sortBy, setSortBy] = useState<'match' | 'priceAsc' | 'priceDesc' | 'rating'>('match');

  const interestOptions: { type: InterestType; label: string; icon: any; desc: string }[] = [
    { type: 'beaches', label: 'Beaches', icon: Palmtree, desc: 'Coastlines & sunsets' },
    { type: 'mountains', label: 'Mountains', icon: Mountain, desc: 'Alpine peaks & trails' },
    { type: 'nature', label: 'Nature', icon: Sun, desc: 'Lush tea estates & lakes' },
    { type: 'adventure', label: 'Adventure', icon: Compass, desc: 'Rafting, treks & thrills' },
    { type: 'history', label: 'History', icon: Landmark, desc: 'Forts, temples & palaces' },
    { type: 'food', label: 'Food & Cuisine', icon: Utensils, desc: 'Authentic local dishes' },
  ];

  const budgetOptions: { level: BudgetLevel; title: string; rangeINR: string; rangeUSD: string; desc: string }[] = [
    { level: 'low', title: 'Low / Budget', rangeINR: '₹1,500 – ₹3,000', rangeUSD: '$20 – $40', desc: 'Hostels, local transit, street food' },
    { level: 'medium', title: 'Medium / Comfort', rangeINR: '₹3,500 – ₹7,000', rangeUSD: '$45 – $90', desc: 'Resorts, private transit, dining' },
    { level: 'high', title: 'High / Luxury', rangeINR: '₹8,000+', rangeUSD: '$110+', desc: 'Luxury stays, private tours, fine dining' },
  ];

  const locationOptions: { loc: LocationPreference; label: string; flag: string }[] = [
    { loc: 'india', label: 'India Only', flag: '🇮🇳' },
    { loc: 'international', label: 'International', flag: '✈️' },
    { loc: 'all', label: 'Anywhere', flag: '🌍' },
  ];

  const handleInterestToggle = (interest: InterestType) => {
    setPreferences(prev => {
      const exists = prev.interests.includes(interest);
      let updated: InterestType[];
      if (exists) {
        updated = prev.interests.length > 1 ? prev.interests.filter(i => i !== interest) : prev.interests;
      } else {
        updated = [...prev.interests, interest];
      }
      return { ...prev, interests: updated };
    });
  };

  const handleRunRecommender = () => {
    setIsCalculating(true);
    setTimeout(() => {
      onCalculateRecommendations(preferences);
      setIsCalculating(false);
      try {
        confetti({ particleCount: 45, spread: 60, origin: { y: 0.6 } });
      } catch {}
      const resultsEl = document.getElementById('ml-results-anchor');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 350);
  };

  const sortedRecommendations = [...recommendations].sort((a, b) => {
    if (sortBy === 'match') return b.matchScore - a.matchScore;
    if (sortBy === 'priceAsc') return a.destination.avgCostPerDayINR - b.destination.avgCostPerDayINR;
    if (sortBy === 'priceDesc') return b.destination.avgCostPerDayINR - a.destination.avgCostPerDayINR;
    if (sortBy === 'rating') return b.destination.rating - a.destination.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>Machine Learning Recommender</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          What kind of journey are you craving?
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          Select your travel passions, budget tier, duration, and region.
          Our algorithm runs vector Cosine Similarity across destination attributes to calculate your optimal match.
        </p>
      </div>

      {/* Preferences Form Card */}
      <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl backdrop-blur-md space-y-10">
        
        {/* Step 1: Interests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-teal-500/20 text-teal-300 font-extrabold text-xs flex items-center justify-center border border-teal-500/30">1</span>
                <span>Select Your Interests</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Select travel passions you love</p>
            </div>
            <span className="text-xs font-semibold text-teal-300 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-lg">
              {preferences.interests.length} selected
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {interestOptions.map((opt) => {
              const isSelected = preferences.interests.includes(opt.type);
              const IconComp = opt.icon;
              return (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => handleInterestToggle(opt.type)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-32 ${
                    isSelected
                      ? 'border-teal-400 bg-teal-500/15 shadow-lg shadow-teal-500/10 ring-1 ring-teal-400'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-teal-500 text-slate-950 shadow-md' : 'bg-slate-800/80 text-slate-400'
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-teal-400 text-slate-950 flex items-center justify-center font-bold">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div>
                    <p className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {opt.label}
                    </p>
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{opt.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Budget */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 mb-1">
            <span className="w-7 h-7 rounded-xl bg-teal-500/20 text-teal-300 font-extrabold text-xs flex items-center justify-center border border-teal-500/30">2</span>
            <span>Choose Your Budget Tier</span>
          </h3>
          <p className="text-xs text-slate-400 mb-4">Estimated per person cost per day</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {budgetOptions.map((b) => {
              const isSelected = preferences.budget === b.level;
              return (
                <button
                  key={b.level}
                  type="button"
                  onClick={() => setPreferences(prev => ({ ...prev, budget: b.level }))}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-teal-400 bg-teal-500/15 shadow-lg shadow-teal-500/10 ring-1 ring-teal-400'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-bold ${isSelected ? 'text-teal-300' : 'text-slate-200'}`}>
                      {b.title}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-teal-400 text-slate-950 flex items-center justify-center font-bold">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-base font-extrabold text-teal-400">
                    {currency === 'INR' ? b.rangeINR : b.rangeUSD}
                    <span className="text-xs text-slate-400 font-normal"> /day</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-2">{b.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Duration & Location */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
          
          {/* Trip Duration */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-teal-500/20 text-teal-300 font-extrabold text-xs flex items-center justify-center border border-teal-500/30">3</span>
                <span>Trip Duration</span>
              </h3>
              <span className="text-xs sm:text-sm font-extrabold text-teal-400 bg-teal-500/10 border border-teal-500/30 px-3 py-1 rounded-xl">
                {preferences.durationDays} Days
              </span>
            </div>

            <div className="space-y-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
              <input
                type="range"
                min={2}
                max={14}
                value={preferences.durationDays}
                onChange={(e) => setPreferences(prev => ({ ...prev, durationDays: Number(e.target.value) }))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-semibold px-1">
                <span>2D (Weekend)</span>
                <span>5 Days</span>
                <span>7 Days (Week)</span>
                <span>14 Days</span>
              </div>

              {/* Quick Presets */}
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs font-semibold text-slate-400">Presets:</span>
                {[3, 4, 5, 7, 10].map(days => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setPreferences(prev => ({ ...prev, durationDays: days }))}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      preferences.durationDays === days
                        ? 'bg-teal-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {days}D
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-teal-500/20 text-teal-300 font-extrabold text-xs flex items-center justify-center border border-teal-500/30">4</span>
              <span>Preferred Location</span>
            </h3>

            <div className="grid grid-cols-3 gap-2.5">
              {locationOptions.map((loc) => {
                const isSelected = preferences.location === loc.loc;
                return (
                  <button
                    key={loc.loc}
                    type="button"
                    onClick={() => setPreferences(prev => ({ ...prev, location: loc.loc }))}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-teal-400 bg-teal-500/15 shadow-lg shadow-teal-500/10 ring-1 ring-teal-400'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{loc.flag}</span>
                    <span className={`text-xs font-bold block ${isSelected ? 'text-teal-300' : 'text-slate-300'}`}>
                      {loc.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-400 italic">
              {preferences.location === 'india' && 'Showing curated domestic getaways across India.'}
              {preferences.location === 'international' && 'Showing curated international destinations.'}
              {preferences.location === 'all' && 'Comparing all domestic and international destinations.'}
            </p>
          </div>

        </div>

        {/* Generate CTA */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Algorithm: Vector space modeling + Cosine Similarity scoring</span>
          </div>

          <button
            type="button"
            onClick={handleRunRecommender}
            disabled={isCalculating}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 via-sky-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-teal-500/25 flex items-center justify-center gap-3 transition-all hover:scale-102 cursor-pointer disabled:opacity-70"
          >
            {isCalculating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Computing Cosine Vectors...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Recommendations</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

      </div>

      <div id="ml-results-anchor" className="pt-2" />

      {/* Results Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-white">Recommended Destinations</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {sortedRecommendations.length} Destinations
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Ranked by vector Cosine Similarity match score with Explainable AI rationale
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-teal-400 cursor-pointer"
            >
              <option value="match">Highest ML Match %</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {sortedRecommendations.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/60 rounded-3xl border border-dashed border-slate-800 p-8">
            <Palmtree className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white">No destinations match this combination</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-4">
              Try adjusting your interests or switching the location filter to "Anywhere".
            </p>
            <button
              onClick={() => setPreferences({
                interests: ['beaches', 'adventure'],
                budget: 'medium',
                durationDays: 4,
                location: 'all'
              })}
              className="px-4 py-2 bg-teal-500 text-slate-950 font-bold rounded-xl text-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sortedRecommendations.map((result) => (
              <RecommendationCard
                key={result.destination.id}
                result={result}
                currency={currency}
                userDuration={preferences.durationDays}
                isSaved={savedIds.includes(result.destination.id)}
                onToggleSave={onToggleSave}
                onViewDetails={onViewDetails}
                onSelectForItinerary={onSelectForItinerary}
                onInspectMath={onInspectMath}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
