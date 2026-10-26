import React, { useState } from 'react';
import { Heart, Calendar, Plus, Trash2, Printer, MapPin, DollarSign } from 'lucide-react';
import { UserTrip, Destination, TripItineraryDay } from '../types/travel';

interface MyTripsViewProps {
  savedDestinations: Destination[];
  userTrips: UserTrip[];
  currency: 'INR' | 'USD';
  onRemoveSaved: (destId: string) => void;
  onViewDetails: (dest: Destination) => void;
  onCreateTripFromDest: (dest: Destination) => void;
  onUpdateTrip: (trip: UserTrip) => void;
  onDeleteTrip: (tripId: string) => void;
  onNavigateToExplore: () => void;
}

export const MyTripsView: React.FC<MyTripsViewProps> = ({
  savedDestinations,
  userTrips,
  currency,
  onRemoveSaved,
  onViewDetails,
  onCreateTripFromDest,
  onUpdateTrip,
  onDeleteTrip,
  onNavigateToExplore,
}) => {
  const [activeTab, setActiveTab] = useState<'itineraries' | 'saved'>('itineraries');
  const [selectedTripId, setSelectedTripId] = useState<string | null>(
    userTrips.length > 0 ? userTrips[0].id : null
  );

  const currentTrip = userTrips.find(t => t.id === selectedTripId) || userTrips[0] || null;
  const currencySymbol = currency === 'INR' ? '₹' : '$';

  const totalCost = currentTrip
    ? (currency === 'INR' ? currentTrip.totalEstimatedBudgetINR : currentTrip.totalEstimatedBudgetUSD)
    : 0;

  const stayCost = Math.round(totalCost * 0.45);
  const foodCost = Math.round(totalCost * 0.25);
  const activityCost = Math.round(totalCost * 0.15);
  const transportCost = Math.round(totalCost * 0.15);

  const handlePrint = () => {
    window.print();
  };

  const handleAddDay = () => {
    if (!currentTrip) return;
    const nextDayNum = currentTrip.itinerary.length + 1;
    const newDay: TripItineraryDay = {
      dayNumber: nextDayNum,
      title: `Day ${nextDayNum}: Local Discovery & Leisure`,
      morningPlan: 'Visit local morning market, artisan handicrafts, and authentic regional breakfast.',
      afternoonPlan: 'Explore nearby scenic viewpoint, cultural museum, or relaxing park.',
      eveningPlan: 'Farewell celebratory dinner and leisurely night stroll.',
      customNotes: '',
      estimatedDayCostINR: currentTrip.itinerary[0]?.estimatedDayCostINR || 3000
    };

    const updatedTrip: UserTrip = {
      ...currentTrip,
      durationDays: nextDayNum,
      totalEstimatedBudgetINR: currentTrip.totalEstimatedBudgetINR + (currentTrip.itinerary[0]?.estimatedDayCostINR || 3000),
      totalEstimatedBudgetUSD: currentTrip.totalEstimatedBudgetUSD + 40,
      itinerary: [...currentTrip.itinerary, newDay]
    };

    onUpdateTrip(updatedTrip);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            My Travel Itineraries & Bucket List
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Organize your day-by-day travel plans, budget estimates, and saved favourite destinations.
          </p>
        </div>

        {/* View toggle tabs */}
        <div className="flex items-center bg-slate-900 p-1 rounded-2xl text-xs font-semibold border border-slate-800">
          <button
            onClick={() => setActiveTab('itineraries')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'itineraries' ? 'bg-slate-800 text-teal-300 shadow-xs font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            🗺️ Planned Itineraries ({userTrips.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'saved' ? 'bg-slate-800 text-teal-300 shadow-xs font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            ❤️ Saved Favourites ({savedDestinations.length})
          </button>
        </div>
      </div>

      {/* ITINERARIES TAB */}
      {activeTab === 'itineraries' && (
        <div className="space-y-8">
          
          {userTrips.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/60 rounded-3xl border border-dashed border-slate-800 p-8 space-y-4">
              <Calendar className="w-12 h-12 text-slate-600 mx-auto" />
              <div>
                <h4 className="text-lg font-bold text-white">You haven't planned any trips yet!</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                  Discover destinations and click "Plan Itinerary" to auto-generate a full day-by-day itinerary.
                </p>
              </div>
              <button
                onClick={onNavigateToExplore}
                className="px-5 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs cursor-pointer"
              >
                Explore Destinations Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Trip Selector Sidebar (col-4) */}
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Trips</span>
                  <span className="text-xs font-bold text-teal-400">{userTrips.length} Total</span>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {userTrips.map((trip) => {
                    const isSelected = (currentTrip && currentTrip.id === trip.id);
                    const tripCost = currency === 'INR' ? trip.totalEstimatedBudgetINR : trip.totalEstimatedBudgetUSD;

                    return (
                      <div
                        key={trip.id}
                        onClick={() => setSelectedTripId(trip.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                          isSelected
                            ? 'bg-teal-950/40 border-teal-500/60 shadow-lg ring-1 ring-teal-400/40'
                            : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={trip.destinationImage}
                            alt={trip.destinationName}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 opacity-90"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wide">
                              {trip.durationDays} Days • {trip.destinationCountry}
                            </span>
                            <h4 className="text-sm font-bold text-white truncate">
                              {trip.destinationName}
                            </h4>
                            <p className="text-xs font-extrabold text-slate-300 mt-1">
                              {currencySymbol}{tripCost.toLocaleString()}
                              <span className="text-[10px] text-slate-500 font-normal"> est. total</span>
                            </p>
                          </div>
                        </div>

                        {/* Delete button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Remove itinerary for ${trip.destinationName}?`)) {
                              onDeleteTrip(trip.id);
                            }
                          }}
                          className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                          title="Delete itinerary"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Itinerary Details & Day-Wise Plan (col-8) */}
              {currentTrip && (
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Trip Banner Header */}
                  <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5 backdrop-blur-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                            {currentTrip.durationDays} Days Itinerary
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 uppercase">
                            {currentTrip.budgetCategory} Budget
                          </span>
                        </div>
                        <h3 className="text-2xl font-extrabold text-white mt-1">
                          {currentTrip.destinationName}
                        </h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-teal-400" />
                          <span>Destination: {currentTrip.destinationName}, {currentTrip.destinationCountry}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={handlePrint}
                          className="px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          title="Print or export to PDF"
                        >
                          <Printer className="w-4 h-4 text-slate-400" />
                          <span>Print / Export PDF</span>
                        </button>
                      </div>
                    </div>

                    {/* Expense Breakdown */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4 text-teal-400" /> Estimated Trip Expenses Breakdown
                        </span>
                        <span className="text-sm font-extrabold text-teal-400">
                          Total: {currencySymbol}{totalCost.toLocaleString()}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                          <span className="text-slate-500 block text-[11px]">🏨 Stay & Lodging (45%)</span>
                          <span className="font-bold text-white text-sm">{currencySymbol}{stayCost.toLocaleString()}</span>
                        </div>
                        <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                          <span className="text-slate-500 block text-[11px]">🍜 Food & Dining (25%)</span>
                          <span className="font-bold text-white text-sm">{currencySymbol}{foodCost.toLocaleString()}</span>
                        </div>
                        <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                          <span className="text-slate-500 block text-[11px]">🎟️ Activities & Entry (15%)</span>
                          <span className="font-bold text-white text-sm">{currencySymbol}{activityCost.toLocaleString()}</span>
                        </div>
                        <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                          <span className="text-slate-500 block text-[11px]">🚕 Local Commute (15%)</span>
                          <span className="font-bold text-white text-sm">{currencySymbol}{transportCost.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Trip Notes */}
                    {currentTrip.notes && (
                      <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-xs text-amber-300">
                        <strong className="block font-bold mb-0.5">📌 Traveler Notes:</strong>
                        <span>{currentTrip.notes}</span>
                      </div>
                    )}
                  </div>

                  {/* Day-by-Day Schedule */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-white">Day-by-Day Travel Schedule</h4>
                      <button
                        onClick={handleAddDay}
                        className="px-3 py-1.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 text-xs font-bold flex items-center gap-1 border border-teal-500/30 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Day {currentTrip.itinerary.length + 1}</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {currentTrip.itinerary.map((day) => (
                        <div
                          key={day.dayNumber}
                          className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-lg space-y-4 hover:border-slate-700 transition-colors backdrop-blur-md"
                        >
                          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <div className="flex items-center gap-2.5">
                              <span className="w-7 h-7 rounded-xl bg-teal-500 text-slate-950 font-black text-xs flex items-center justify-center">
                                {day.dayNumber}
                              </span>
                              <h5 className="text-sm font-bold text-white">{day.title}</h5>
                            </div>
                            <span className="text-xs font-bold text-slate-400">
                              Day Est: {currencySymbol}{(currency === 'INR' ? day.estimatedDayCostINR : Math.round(day.estimatedDayCostINR / 80)).toLocaleString()}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 space-y-1">
                              <span className="text-amber-400 font-bold flex items-center gap-1">
                                🌅 Morning Plan
                              </span>
                              <p className="text-slate-300 leading-relaxed">{day.morningPlan}</p>
                            </div>

                            <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-500/20 space-y-1">
                              <span className="text-sky-400 font-bold flex items-center gap-1">
                                ☀️ Afternoon Sightseeing
                              </span>
                              <p className="text-slate-300 leading-relaxed">{day.afternoonPlan}</p>
                            </div>

                            <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 space-y-1">
                              <span className="text-purple-400 font-bold flex items-center gap-1">
                                🌙 Evening & Dinner
                              </span>
                              <p className="text-slate-300 leading-relaxed">{day.eveningPlan}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* SAVED DESTINATIONS TAB */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          {savedDestinations.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/60 rounded-3xl border border-dashed border-slate-800 p-8 space-y-3">
              <Heart className="w-12 h-12 text-slate-600 mx-auto" />
              <h4 className="text-lg font-bold text-white">No saved destinations yet</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Explore destinations and tap the heart icon to save spots to your personal travel bucket list.
              </p>
              <button
                onClick={onNavigateToExplore}
                className="px-5 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs cursor-pointer"
              >
                Browse Destinations
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedDestinations.map((dest) => {
                const cost = currency === 'INR' ? dest.avgCostPerDayINR : dest.avgCostPerDayUSD;
                return (
                  <div
                    key={dest.id}
                    className="bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-800 shadow-xl flex flex-col justify-between group backdrop-blur-md"
                  >
                    <div className="relative h-48 w-full bg-slate-950">
                      <img
                        src={dest.imageUrl}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                      
                      <button
                        onClick={() => onRemoveSaved(dest.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/80 backdrop-blur-md text-rose-500 border border-slate-700/60 flex items-center justify-center shadow-md hover:scale-110 cursor-pointer"
                        title="Remove from favorites"
                      >
                        <Heart className="w-4 h-4 fill-rose-500" />
                      </button>

                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-teal-400 text-[10px] uppercase font-bold">{dest.country}</span>
                        <h4 className="text-lg font-bold text-white">{dest.name}</h4>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <p className="text-xs text-slate-400 line-clamp-2">{dest.description}</p>
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-slate-400">Est. Daily: <strong className="text-white">{currencySymbol}{cost.toLocaleString()}</strong></span>
                        <span className="text-teal-400 font-bold">{dest.idealDurationDays} Days</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                        <button
                          onClick={() => onViewDetails(dest)}
                          className="w-full py-2 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800 cursor-pointer"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            onCreateTripFromDest(dest);
                            setActiveTab('itineraries');
                          }}
                          className="w-full py-2 rounded-xl bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 text-slate-950 text-xs font-bold cursor-pointer"
                        >
                          Create Itinerary
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
