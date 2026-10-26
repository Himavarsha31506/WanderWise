import React, { useState, useMemo } from 'react';
import { Search, Heart, Star, Sparkles, ArrowRight, X } from 'lucide-react';
import { Destination, InterestType, BudgetLevel, LocationPreference } from '../types/travel';

interface ExploreViewProps {
  destinations: Destination[];
  currency: 'INR' | 'USD';
  savedIds: string[];
  onToggleSave: (destId: string) => void;
  onViewDetails: (dest: Destination) => void;
  onPlanTripWithDestination: (dest: Destination) => void;
  onOpenRecommender: () => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  destinations,
  currency,
  savedIds,
  onToggleSave,
  onViewDetails,
  onPlanTripWithDestination,
  onOpenRecommender,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<LocationPreference>('all');
  const [selectedBudget, setSelectedBudget] = useState<BudgetLevel | 'all'>('all');
  const [selectedInterest, setSelectedInterest] = useState<InterestType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'priceAsc' | 'priceDesc' | 'days'>('rating');

  const interestsList: { type: InterestType; label: string }[] = [
    { type: 'beaches', label: '🏖️ Beaches' },
    { type: 'mountains', label: '🏔️ Mountains' },
    { type: 'nature', label: '🌿 Nature' },
    { type: 'adventure', label: '🧗 Adventure' },
    { type: 'history', label: '🏛️ History' },
    { type: 'food', label: '🍜 Food' },
  ];

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = dest.name.toLowerCase().includes(q);
        const matchesCountry = dest.country.toLowerCase().includes(q);
        const matchesCity = dest.stateOrCity.toLowerCase().includes(q);
        const matchesAttractions = dest.popularAttractions.some(a => a.toLowerCase().includes(q));
        const matchesInterests = dest.interests.some(i => i.toLowerCase().includes(q));
        if (!matchesName && !matchesCountry && !matchesCity && !matchesAttractions && !matchesInterests) {
          return false;
        }
      }

      if (selectedRegion !== 'all' && dest.region !== selectedRegion) {
        return false;
      }
      if (selectedBudget !== 'all' && dest.budgetCategory !== selectedBudget) {
        return false;
      }
      if (selectedInterest !== 'all' && !dest.interests.includes(selectedInterest)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'priceAsc') return a.avgCostPerDayINR - b.avgCostPerDayINR;
      if (sortBy === 'priceDesc') return b.avgCostPerDayINR - a.avgCostPerDayINR;
      if (sortBy === 'days') return a.idealDurationDays - b.idealDurationDays;
      return 0;
    });
  }, [destinations, searchQuery, selectedRegion, selectedBudget, selectedInterest, sortBy]);

  const hasActiveFilters = searchQuery !== '' || selectedRegion !== 'all' || selectedBudget !== 'all' || selectedInterest !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedBudget('all');
    setSelectedInterest('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & ML CTA */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
            Destination Catalog
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Explore Handpicked Destinations
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse through top tourist spots in India and across the world with transparent budgets and itineraries.
          </p>
        </div>

        <button
          onClick={onOpenRecommender}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all hover:scale-102 cursor-pointer self-start md:self-auto shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Get ML Recommendations</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-xl backdrop-blur-md space-y-5">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destination, country, city, or attractions (e.g. Goa, Baga, Alps, Kyoto)..."
            className="w-full pl-12 pr-10 py-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-800">
          
          {/* Region Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl text-xs font-semibold border border-slate-800">
            <button
              onClick={() => setSelectedRegion('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedRegion === 'all' ? 'bg-slate-800 text-teal-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              🌍 All
            </button>
            <button
              onClick={() => setSelectedRegion('india')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedRegion === 'india' ? 'bg-slate-800 text-teal-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              🇮🇳 India
            </button>
            <button
              onClick={() => setSelectedRegion('international')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedRegion === 'international' ? 'bg-slate-800 text-teal-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              ✈️ International
            </button>
          </div>

          {/* Budget filter */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-400 font-semibold hidden sm:inline">Budget:</span>
            {(['all', 'low', 'medium', 'high'] as const).map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBudget(b)}
                className={`px-2.5 py-1.5 rounded-xl capitalize font-semibold transition-all cursor-pointer ${
                  selectedBudget === b
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {b === 'all' ? 'Any Budget' : b}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-slate-400 font-semibold">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 px-3 py-1.5 rounded-xl outline-none focus:ring-1 focus:ring-teal-400 cursor-pointer"
            >
              <option value="rating">Top Rated ⭐</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="days">Duration: Short to Long</option>
            </select>
          </div>

        </div>

        {/* Interests Pills */}
        <div className="flex items-center gap-2 flex-wrap pt-2">
          <span className="text-xs font-semibold text-slate-400 shrink-0">Interest:</span>
          <button
            onClick={() => setSelectedInterest('all')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedInterest === 'all'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            All Passions
          </button>
          {interestsList.map((item) => (
            <button
              key={item.type}
              onClick={() => setSelectedInterest(item.type)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedInterest === item.type
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-rose-400 hover:text-rose-300 ml-auto flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" /> Clear Filters
            </button>
          )}
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Showing <strong className="text-white">{filteredDestinations.length}</strong> destinations</span>
        {hasActiveFilters && <span className="text-teal-400 font-semibold">Filtered view</span>}
      </div>

      {/* Destinations Grid */}
      {filteredDestinations.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/60 rounded-3xl border border-dashed border-slate-800 p-8">
          <h4 className="text-lg font-bold text-white">No destinations match your filters</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-4">
            Try adjusting your search query or selecting a different budget or interest category.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-teal-500 text-slate-950 font-bold rounded-xl text-xs cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDestinations.map((dest) => {
            const isSaved = savedIds.includes(dest.id);
            const cost = currency === 'INR' ? dest.avgCostPerDayINR : dest.avgCostPerDayUSD;
            const currencySymbol = currency === 'INR' ? '₹' : '$';

            return (
              <div
                key={dest.id}
                className="bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-800 hover:border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 flex flex-col group cursor-pointer backdrop-blur-md"
                onClick={() => onViewDetails(dest)}
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-950/80 backdrop-blur-md text-slate-200 border border-slate-700/60">
                      {dest.region === 'india' ? '🇮🇳 India' : '✈️ International'}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-400 text-slate-950 flex items-center gap-1 shadow-xs">
                      <Star className="w-3 h-3 fill-slate-950" /> {dest.rating}
                    </span>
                  </div>

                  {/* Heart / Save */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(dest.id);
                    }}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/80 backdrop-blur-md text-slate-300 hover:text-rose-500 border border-slate-700/60 flex items-center justify-center shadow-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'text-rose-500 fill-rose-500' : 'text-slate-300'}`} />
                  </button>

                  {/* Title */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-teal-400 text-[11px] font-semibold uppercase tracking-wider block">
                      {dest.stateOrCity}, {dest.country}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-white drop-shadow-md">
                      {dest.name}
                    </h3>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-slate-300">
                  <div>
                    <p className="text-xs text-slate-400 line-clamp-1 italic mb-2">
                      "{dest.tagline}"
                    </p>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {dest.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {dest.interests.map((interest) => (
                        <span
                          key={interest}
                          className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-800 text-slate-300 capitalize border border-slate-700/60"
                        >
                          #{interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing info */}
                  <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Avg Daily Cost</span>
                      <span className="font-extrabold text-slate-100 text-sm">
                        {currencySymbol}{cost.toLocaleString()}
                        <span className="text-[10px] text-slate-400 font-normal"> /day</span>
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-slate-500 block text-[10px]">Ideal Duration</span>
                      <span className="font-bold text-teal-400 text-xs">
                        {dest.idealDurationDays} Days ({dest.minDays}–{dest.maxDays}D)
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails(dest);
                      }}
                      className="w-full py-2 px-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs cursor-pointer"
                    >
                      View Details
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlanTripWithDestination(dest);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                    >
                      <span>Plan Trip</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
