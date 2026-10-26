import React, { useState } from 'react';
import { Heart, Sparkles, MapPin, CheckCircle2, ChevronDown, ChevronUp, ArrowRight, Activity } from 'lucide-react';
import { RecommendationResult, Destination } from '../types/travel';

interface RecommendationCardProps {
  result: RecommendationResult;
  currency: 'INR' | 'USD';
  userDuration: number;
  isSaved: boolean;
  onToggleSave: (destId: string) => void;
  onViewDetails: (dest: Destination) => void;
  onSelectForItinerary: (dest: Destination) => void;
  onInspectMath?: (result: RecommendationResult) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  result,
  currency,
  userDuration,
  isSaved,
  onToggleSave,
  onViewDetails,
  onSelectForItinerary,
  onInspectMath,
}) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const { destination: dest, matchScore, reasons, cosineSimilarity } = result;

  const costPerDay = currency === 'INR' ? dest.avgCostPerDayINR : dest.avgCostPerDayUSD;
  const currencySymbol = currency === 'INR' ? '₹' : '$';
  const totalCost = costPerDay * userDuration;

  const getBadgeStyle = (score: number) => {
    if (score >= 88) {
      return 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-emerald-500/30';
    } else if (score >= 70) {
      return 'bg-gradient-to-r from-sky-500 to-blue-500 text-slate-950 shadow-sky-500/30';
    } else {
      return 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-amber-500/30';
    }
  };

  return (
    <div className="bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-800 hover:border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 flex flex-col group backdrop-blur-md">
      
      {/* Destination Image */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-950">
        <img
          src={dest.imageUrl}
          alt={dest.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
          <div className={`px-3 py-1.5 rounded-full text-xs font-black shadow-lg flex items-center gap-1.5 ${getBadgeStyle(matchScore)}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{matchScore}% ML Match</span>
          </div>

          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-950/80 backdrop-blur-md text-slate-200 border border-slate-700/60 shadow-xs">
            {dest.region === 'india' ? '🇮🇳 India' : '✈️ International'}
          </span>
        </div>

        {/* Heart / Save Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(dest.id);
          }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-950/80 backdrop-blur-md text-slate-300 hover:text-rose-500 border border-slate-700/70 flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer"
          title={isSaved ? 'Remove from saved' : 'Save destination'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'text-rose-500 fill-rose-500' : 'text-slate-300'}`} />
        </button>

        {/* Bottom Destination Title */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-1 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-0.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{dest.stateOrCity}, {dest.country}</span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
            {dest.name}
          </h3>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 text-slate-300">
        
        <div>
          <p className="text-xs font-semibold text-slate-400 line-clamp-1 mb-2">
            {dest.tagline}
          </p>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
            {dest.description}
          </p>

          {/* Interests tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {dest.interests.map((interest) => (
              <span
                key={interest}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800/80 text-slate-300 capitalize border border-slate-700/60"
              >
                #{interest}
              </span>
            ))}
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 uppercase border border-emerald-500/30">
              {dest.budgetCategory} budget
            </span>
          </div>
        </div>

        {/* Budget Stats Box */}
        <div className="p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-slate-500 block text-[11px]">Avg Daily Cost</span>
            <span className="font-extrabold text-slate-100 text-sm">
              {currencySymbol}{costPerDay.toLocaleString()}
              <span className="text-[10px] text-slate-400 font-normal"> /day</span>
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">{userDuration}-Day Trip Est.</span>
            <span className="font-extrabold text-teal-400 text-sm">
              {currencySymbol}{totalCost.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Attractions */}
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Top Attractions</p>
          <div className="flex flex-wrap gap-1.5">
            {dest.popularAttractions.slice(0, 3).map((attr, idx) => (
              <span key={idx} className="text-xs text-slate-300 bg-slate-800/60 border border-slate-700/50 px-2.5 py-0.5 rounded-md truncate max-w-[200px]">
                • {attr}
              </span>
            ))}
          </div>
        </div>

        {/* Explainable AI (XAI) Box */}
        <div className="border-t border-slate-800/80 pt-3">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="w-full flex items-center justify-between text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors py-1 cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Why this matches your preferences</span>
            </span>
            {showExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showExplanation && (
            <div className="mt-2.5 space-y-2 bg-teal-950/30 p-3 rounded-xl border border-teal-500/20 text-xs text-slate-300 animate-fade-in">
              <div className="flex items-center justify-between border-b border-teal-500/20 pb-1.5 mb-1.5">
                <span className="font-semibold text-teal-300">ML Vector Similarity:</span>
                <span className="font-mono font-bold text-teal-400 bg-slate-900 px-1.5 py-0.5 rounded text-[11px] border border-teal-500/30">
                  Cos(θ) = {cosineSimilarity}
                </span>
              </div>
              {reasons.map((r, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">{r.title}: </span>
                    <span className="text-slate-300">{r.detail}</span>
                  </div>
                </div>
              ))}

              {onInspectMath && (
                <div className="pt-1.5 text-right">
                  <button
                    onClick={() => onInspectMath(result)}
                    className="text-[11px] text-teal-300 font-bold underline hover:text-teal-200 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Activity className="w-3 h-3" /> View Vector Dot Product Table
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewDetails(dest)}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
          >
            Details & Season
          </button>

          <button
            onClick={() => onSelectForItinerary(dest)}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-teal-500/20 transition-all cursor-pointer"
          >
            <span>Plan Itinerary</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
