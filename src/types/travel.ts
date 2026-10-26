export type InterestType = 'beaches' | 'mountains' | 'nature' | 'adventure' | 'history' | 'food';

export type BudgetLevel = 'low' | 'medium' | 'high';

export type LocationPreference = 'india' | 'international' | 'all';

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: 'india' | 'international';
  stateOrCity: string;
  tagline: string;
  description: string;
  imageUrl: string;
  gallery: string[];
  interests: InterestType[];
  budgetCategory: BudgetLevel;
  avgCostPerDayINR: number;
  avgCostPerDayUSD: number;
  minDays: number;
  maxDays: number;
  idealDurationDays: number;
  popularAttractions: string[];
  bestSeason: string;
  weatherSummary: string;
  highlights: string[];
  localFoodSpecialties: string[];
  adventureActivities: string[];
  rating: number;
  reviewCount: number;
  sampleItinerary: {
    day: number;
    title: string;
    morning: string;
    afternoon: string;
    evening: string;
  }[];
}

export interface UserPreferences {
  interests: InterestType[];
  budget: BudgetLevel;
  durationDays: number;
  location: LocationPreference;
}

export interface MatchReason {
  category: 'interests' | 'budget' | 'duration' | 'location';
  title: string;
  detail: string;
  scoreContribution: number;
}

export interface RecommendationResult {
  destination: Destination;
  matchScore: number; // 0 to 100%
  cosineSimilarity: number; // 0.0 to 1.0
  reasons: MatchReason[];
  estimatedTotalBudgetINR: number;
  estimatedTotalBudgetUSD: number;
  vectorBreakdown: {
    feature: string;
    userValue: number;
    destValue: number;
    product: number;
  }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  savedDestinationIds: string[];
}

export interface TripItineraryDay {
  dayNumber: number;
  title: string;
  morningPlan: string;
  afternoonPlan: string;
  eveningPlan: string;
  customNotes?: string;
  estimatedDayCostINR: number;
}

export interface UserTrip {
  id: string;
  userId: string;
  destinationId: string;
  destinationName: string;
  destinationCountry: string;
  destinationImage: string;
  startDate?: string;
  durationDays: number;
  budgetCategory: BudgetLevel;
  totalEstimatedBudgetINR: number;
  totalEstimatedBudgetUSD: number;
  notes: string;
  createdAt: string;
  status: 'planned' | 'completed' | 'bucketlist';
  itinerary: TripItineraryDay[];
}
