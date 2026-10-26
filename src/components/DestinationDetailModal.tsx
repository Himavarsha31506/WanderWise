import React, { useState } from 'react';
import { X, Heart, MapPin, Calendar, CheckCircle, ArrowRight, Utensils, Compass, Clock, Star, Sparkles } from 'lucide-react';
import { Destination } from '../types/travel';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  currency: 'INR' | 'USD';
  isSaved: boolean;
  onToggleSave: (destId: string) => void;
  onPlanTripWithDestination: (dest: Destination) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  currency,
  isSaved,
  onToggleSave,
  onPlanTripWithDestination,
}) => {
  if (!destination) return null;

  const [activeImage, setActiveImage] = useState(destination.imageUrl);
  const [calcDays, setCalcDays] = useState(destination.idealDurationDays);

  const costPerDay = currency === 'INR' ? destination.avgCostPerDayINR : destination.avgCostPerDayUSD;
  const currencySymbol = currency === 'INR' ? '₹' : '$';
  const totalEstimatedCost = costPerDay * calcDays;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => onToggleSave(destination.id)}
            className="w-10 h-10 rounded-full bg-slate-950/80 backdrop-blur-md text-slate-300 hover:text-rose-500 border border-slate-700/60 flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
            title={isSaved ? 'Remove from saved' : 'Save to Favorites'}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'text-rose-500 fill-rose-500' : 'text-slate-300'}`} />
          </button>
          
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-950/80 backdrop-blur-md text-slate-300 hover:text-white border border-slate-700/60 flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1">
          
          {/* Main Hero Image */}
          <div className="relative h-72 sm:h-96 w-full bg-slate-950">
            <img
              src={activeImage}
              alt={destination.name}
              className="w-full h-full object-cover transition-all duration-300 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-teal-400 text-slate-950 shadow-md">
                  {destination.region === 'india' ? '🇮🇳 India' : '✈️ International'}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 backdrop-blur-md text-slate-200 border border-slate-700/60">
                  {destination.budgetCategory.toUpperCase()} BUDGET
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 flex items-center gap-1 shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-slate-950" /> {destination.rating} ({destination.reviewCount}+ reviews)
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-md">
                {destination.name}
              </h2>
              <p className="text-teal-400 text-sm font-semibold flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4" /> {destination.stateOrCity}, {destination.country}
              </p>
            </div>
          </div>

          {/* Photo Gallery Thumbnails */}
          {destination.gallery && destination.gallery.length > 1 && (
            <div className="px-6 py-3 bg-slate-950 border-b border-slate-800 flex items-center gap-3 overflow-x-auto">
              <span className="text-xs font-semibold text-slate-500 shrink-0">Photos:</span>
              <img
                src={destination.imageUrl}
                alt="Main"
                onClick={() => setActiveImage(destination.imageUrl)}
                className={`w-16 h-12 object-cover rounded-xl cursor-pointer border-2 transition-all ${
                  activeImage === destination.imageUrl ? 'border-teal-400 scale-105' : 'border-transparent opacity-60'
                }`}
              />
              {destination.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Gallery ${i}`}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-12 object-cover rounded-xl cursor-pointer border-2 transition-all shrink-0 ${
                    activeImage === img ? 'border-teal-400 scale-105' : 'border-transparent opacity-60'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Details */}
          <div className="p-6 sm:p-8 space-y-8 text-slate-300">
            
            <div>
              <p className="text-base font-semibold text-teal-400 italic mb-2">
                "{destination.tagline}"
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {destination.description}
              </p>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-950/70 rounded-2xl border border-slate-800">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block font-semibold">Best Time to Visit</span>
                  <span className="text-xs font-bold text-white">{destination.bestSeason}</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">{destination.weatherSummary}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block font-semibold">Recommended Duration</span>
                  <span className="text-xs font-bold text-white">
                    {destination.idealDurationDays} Days Ideal
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Min: {destination.minDays}D, Max: {destination.maxDays}D</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <span className="text-sm font-black">{currencySymbol}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block font-semibold">Daily Travel Budget</span>
                  <span className="text-xs font-bold text-white">
                    {currencySymbol}{costPerDay.toLocaleString()} / day
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">{destination.budgetCategory.toUpperCase()} tier estimated</p>
                </div>
              </div>
            </div>

            {/* Budget Estimator Slider */}
            <div className="p-5 bg-teal-950/30 rounded-2xl border border-teal-500/20 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-teal-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    Trip Budget Calculator
                  </h4>
                  <p className="text-xs text-slate-400">Slide to see estimated expenses for customized duration</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Total Estimated Expense</span>
                  <span className="text-xl font-black text-teal-400">
                    {currencySymbol}{totalEstimatedCost.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-teal-300">
                  <span>Duration: {calcDays} Days</span>
                  <span>{currencySymbol}{costPerDay.toLocaleString()} × {calcDays} Days</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={12}
                  value={calcDays}
                  onChange={(e) => setCalcDays(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-center">
                  <span className="text-slate-500 block text-[10px]">Stay (45%)</span>
                  <span className="font-bold text-white">{currencySymbol}{Math.round(totalEstimatedCost * 0.45).toLocaleString()}</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-center">
                  <span className="text-slate-500 block text-[10px]">Food (25%)</span>
                  <span className="font-bold text-white">{currencySymbol}{Math.round(totalEstimatedCost * 0.25).toLocaleString()}</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-center">
                  <span className="text-slate-500 block text-[10px]">Transport (15%)</span>
                  <span className="font-bold text-white">{currencySymbol}{Math.round(totalEstimatedCost * 0.15).toLocaleString()}</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-center">
                  <span className="text-slate-500 block text-[10px]">Sightseeing (15%)</span>
                  <span className="font-bold text-white">{currencySymbol}{Math.round(totalEstimatedCost * 0.15).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Attractions */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400" /> Popular Attractions & Landmarks
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {destination.popularAttractions.map((attr, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                    <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                    <span className="text-xs font-semibold text-slate-200">{attr}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Local Food & Adventure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 p-4 bg-orange-950/20 rounded-2xl border border-orange-500/20">
                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Utensils className="w-4 h-4" /> Must-Try Culinary Delights
                </h4>
                <div className="space-y-1.5">
                  {destination.localFoodSpecialties.map((food, i) => (
                    <div key={i} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      <span>{food}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 p-4 bg-sky-950/20 rounded-2xl border border-sky-500/20">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-4 h-4" /> Thrilling Activities
                </h4>
                <div className="space-y-1.5">
                  {destination.adventureActivities.map((act, i) => (
                    <div key={i} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sample Day-Wise Itinerary */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-400" /> Sample Day-Wise Itinerary
              </h4>
              <div className="space-y-3">
                {destination.sampleItinerary.map((day) => (
                  <div key={day.day} className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="text-xs font-bold text-teal-400 uppercase">Day {day.day}</span>
                      <span className="text-xs font-bold text-white">{day.title}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
                      <div>
                        <span className="font-semibold text-slate-500 block text-[10px]">Morning</span>
                        <p className="text-slate-300">{day.morning}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-500 block text-[10px]">Afternoon</span>
                        <p className="text-slate-300">{day.afternoon}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-500 block text-[10px]">Evening</span>
                        <p className="text-slate-300">{day.evening}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-xs text-slate-500 block">Total for {calcDays} Days</span>
            <span className="text-xl font-black text-white">
              {currencySymbol}{totalEstimatedCost.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-bold text-xs hover:bg-slate-800 cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={() => {
                onPlanTripWithDestination(destination);
                onClose();
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create {destination.name} Itinerary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
