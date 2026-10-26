import { User, UserTrip, Destination } from '../types/travel';

const STORAGE_KEYS = {
  USER: 'wanderwise_user',
  SAVED_DESTS: 'wanderwise_saved_dests',
  USER_TRIPS: 'wanderwise_user_trips',
};

const DEFAULT_DEMO_USER: User = {
  id: 'user-demo-1',
  name: 'Aarav Sharma',
  email: 'aarav.travels@wanderwise.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  savedDestinationIds: ['dest-goa', 'dest-manali'],
};

export const StorageService = {
  getUser(): User | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      if (data) {
        return JSON.parse(data);
      }
      return null;
    } catch {
      return null;
    }
  },

  setUser(user: User | null): void {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (e) {
      console.error('Storage save error:', e);
    }
  },

  loginDemoUser(): User {
    const demo = { ...DEFAULT_DEMO_USER };
    this.setUser(demo);
    return demo;
  },

  getSavedDestinationIds(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_DESTS);
      if (data) {
        return JSON.parse(data);
      }
      return ['dest-goa', 'dest-manali'];
    } catch {
      return ['dest-goa', 'dest-manali'];
    }
  },

  toggleSaveDestination(destinationId: string): string[] {
    const current = this.getSavedDestinationIds();
    let updated: string[];
    if (current.includes(destinationId)) {
      updated = current.filter(id => id !== destinationId);
    } else {
      updated = [...current, destinationId];
    }
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_DESTS, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    return updated;
  },

  getUserTrips(): UserTrip[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_TRIPS);
      if (data) {
        return JSON.parse(data);
      }
      // Return a sample pre-loaded trip so the user immediately sees a working day-wise itinerary
      return [
        {
          id: 'trip-sample-1',
          userId: 'user-demo-1',
          destinationId: 'dest-goa',
          destinationName: 'Goa Coastal Getaway',
          destinationCountry: 'India',
          destinationImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
          startDate: '2026-11-15',
          durationDays: 4,
          budgetCategory: 'medium',
          totalEstimatedBudgetINR: 12800,
          totalEstimatedBudgetUSD: 160,
          notes: 'Pack sunscreen, swimsuits, and camera for sunset shots at Fort Aguada!',
          createdAt: new Date().toISOString(),
          status: 'planned',
          itinerary: [
            {
              dayNumber: 1,
              title: 'Arrival & North Goa Beaches',
              morningPlan: 'Arrive at Dabolim Airport. Check into beach shack hotel in Calangute.',
              afternoonPlan: 'Visit Fort Aguada lighthouse; walk along Candolim beach.',
              eveningPlan: 'Sunset dinner at Tito’s Lane or Britto’s on Baga beach.',
              estimatedDayCostINR: 3200
            },
            {
              dayNumber: 2,
              title: 'Water Sports & Flea Markets',
              morningPlan: 'Jet skiing and parasailing at Anjuna Beach.',
              afternoonPlan: 'Café hopping in Assagao; taste Portuguese poee bread.',
              eveningPlan: 'Anjuna Wednesday/Saturday market & seaside music.',
              estimatedDayCostINR: 3500
            },
            {
              dayNumber: 3,
              title: 'Old Goa Heritage & Spice Plantation',
              morningPlan: 'Tour Basilica of Bom Jesus & Se Cathedral churches.',
              afternoonPlan: 'Spice garden tour in Ponda with Goan fish curry lunch.',
              eveningPlan: 'Mandovi River sunset cruise with live folk dance.',
              estimatedDayCostINR: 3100
            },
            {
              dayNumber: 4,
              title: 'Palolem Beach & Departure',
              morningPlan: 'Relax at Palolem crescent bay and enjoy dolphin spotting boat.',
              afternoonPlan: 'Latin Quarter (Fontainhas) colorful heritage walk in Panaji.',
              eveningPlan: 'Flight back home with cashew nuts and souvenirs.',
              estimatedDayCostINR: 3000
            }
          ]
        }
      ];
    } catch {
      return [];
    }
  },

  saveUserTrip(trip: UserTrip): UserTrip[] {
    const trips = this.getUserTrips();
    const existingIndex = trips.findIndex(t => t.id === trip.id);
    let updated: UserTrip[];
    if (existingIndex >= 0) {
      updated = [...trips];
      updated[existingIndex] = trip;
    } else {
      updated = [trip, ...trips];
    }
    try {
      localStorage.setItem(STORAGE_KEYS.USER_TRIPS, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    return updated;
  },

  deleteUserTrip(tripId: string): UserTrip[] {
    const trips = this.getUserTrips().filter(t => t.id !== tripId);
    try {
      localStorage.setItem(STORAGE_KEYS.USER_TRIPS, JSON.stringify(trips));
    } catch (e) {
      console.error(e);
    }
    return trips;
  },

  createTripFromDestination(dest: Destination, durationDays: number = 4): UserTrip {
    const totalINR = dest.avgCostPerDayINR * durationDays;
    const totalUSD = dest.avgCostPerDayUSD * durationDays;

    const itinerary = Array.from({ length: durationDays }).map((_, idx) => {
      const sample = dest.sampleItinerary[idx] || {
        day: idx + 1,
        title: `Day ${idx + 1}: Discover ${dest.name}`,
        morning: `Morning exploration of top attractions and local breakfast.`,
        afternoon: `Sightseeing around ${dest.popularAttractions[idx % dest.popularAttractions.length] || 'popular landmarks'}.`,
        evening: `Evening stroll and local culinary delights.`
      };
      return {
        dayNumber: idx + 1,
        title: sample.title,
        morningPlan: sample.morning,
        afternoonPlan: sample.afternoon,
        eveningPlan: sample.evening,
        customNotes: '',
        estimatedDayCostINR: dest.avgCostPerDayINR
      };
    });

    const newTrip: UserTrip = {
      id: `trip-${Date.now()}`,
      userId: this.getUser()?.id || 'guest',
      destinationId: dest.id,
      destinationName: dest.name,
      destinationCountry: dest.country,
      destinationImage: dest.imageUrl,
      durationDays,
      budgetCategory: dest.budgetCategory,
      totalEstimatedBudgetINR: totalINR,
      totalEstimatedBudgetUSD: totalUSD,
      notes: `Trip to ${dest.name}. Best visited in ${dest.bestSeason}. Top highlights: ${dest.highlights.slice(0, 2).join(', ')}.`,
      createdAt: new Date().toISOString(),
      status: 'planned',
      itinerary
    };

    return newTrip;
  }
};
