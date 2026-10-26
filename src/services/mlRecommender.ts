import { Destination, UserPreferences, RecommendationResult, MatchReason, InterestType } from '../types/travel';
import { DESTINATIONS_DATA } from '../data/destinations';

const INTEREST_LIST: InterestType[] = ['beaches', 'mountains', 'nature', 'adventure', 'history', 'food'];

/**
 * Normalizes vector dot product: Cosine Similarity
 * Cos(theta) = (A . B) / (||A|| * ||B||)
 */
export function calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length || vecA.length === 0) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;
  return dotProduct / denominator;
}

/**
 * Builds numerical feature vector for user preferences:
 * [beaches, mountains, nature, adventure, history, food, budget_weight, duration_fit_baseline]
 */
export function buildUserVector(pref: UserPreferences): { vector: number[]; featureNames: string[] } {
  const vector: number[] = [];
  const featureNames: string[] = [];

  // Interest features (1.0 if selected, 0.0 otherwise)
  for (const interest of INTEREST_LIST) {
    const isSelected = pref.interests.includes(interest);
    vector.push(isSelected ? 1.0 : 0.0);
    featureNames.push(`Interest: ${interest.toUpperCase()}`);
  }

  // Budget feature normalized: low = 0.33, medium = 0.66, high = 1.0
  const budgetWeight = pref.budget === 'low' ? 0.33 : pref.budget === 'medium' ? 0.66 : 1.0;
  vector.push(budgetWeight);
  featureNames.push('Budget Tier Weight');

  // Normalized Duration Preference: (e.g., 1 to 14 days normalized to 0.1 - 1.0)
  const normDuration = Math.min(Math.max(pref.durationDays / 10, 0.2), 1.0);
  vector.push(normDuration);
  featureNames.push('Trip Duration Scale');

  return { vector, featureNames };
}

/**
 * Builds numerical feature vector for a destination:
 * [beaches, mountains, nature, adventure, history, food, budget_weight, duration_scale]
 */
export function buildDestinationVector(dest: Destination): number[] {
  const vector: number[] = [];

  // Interest features: 1.0 if destination tags contain this interest, else 0.0
  for (const interest of INTEREST_LIST) {
    const hasInterest = dest.interests.includes(interest);
    vector.push(hasInterest ? 1.0 : 0.0);
  }

  // Budget feature: low = 0.33, medium = 0.66, high = 1.0
  const budgetWeight = dest.budgetCategory === 'low' ? 0.33 : dest.budgetCategory === 'medium' ? 0.66 : 1.0;
  vector.push(budgetWeight);

  // Normalized ideal duration
  const normDuration = Math.min(Math.max(dest.idealDurationDays / 10, 0.2), 1.0);
  vector.push(normDuration);

  return vector;
}

/**
 * Machine Learning Content-Based Recommendation Pipeline:
 * 1. Filter by location if specified (India vs International)
 * 2. Calculate Cosine Similarity between User vector & Destination vectors
 * 3. Calculate heuristic bonus/penalties:
 *    - Budget alignment score (exact match gives +15%, compatible gives +5%)
 *    - Duration alignment score (how close user days are to idealDurationDays)
 * 4. Generate Explainable AI breakdown
 * 5. Rank destinations by composite Match Score
 */
export function recommendDestinations(
  preferences: UserPreferences,
  allDestinations: Destination[] = DESTINATIONS_DATA
): RecommendationResult[] {
  const { vector: userVec, featureNames } = buildUserVector(preferences);

  // Filter candidates if specific region requested
  let candidates = allDestinations;
  if (preferences.location !== 'all') {
    const filtered = allDestinations.filter(d => d.region === preferences.location);
    if (filtered.length > 0) {
      candidates = filtered;
    }
  }

  const results: RecommendationResult[] = candidates.map(dest => {
    const destVec = buildDestinationVector(dest);

    // 1. Core Cosine Similarity (0.0 to 1.0)
    const cosineSim = calculateCosineSimilarity(userVec, destVec);

    // 2. Interest Overlap Analysis
    const matchedInterests = preferences.interests.filter(i => dest.interests.includes(i));
    const interestCoverage = preferences.interests.length > 0
      ? matchedInterests.length / preferences.interests.length
      : 0.5;

    // 3. Budget Alignment
    let budgetBonus = 0;
    let budgetReasonText = '';
    if (dest.budgetCategory === preferences.budget) {
      budgetBonus = 0.20; // 20% bonus for exact budget match
      budgetReasonText = `Matches your ${preferences.budget.toUpperCase()} budget preference (avg ₹${dest.avgCostPerDayINR.toLocaleString()}/day)`;
    } else if (
      (preferences.budget === 'medium' && (dest.budgetCategory === 'low' || dest.budgetCategory === 'high')) ||
      (preferences.budget === 'high' && dest.budgetCategory === 'medium')
    ) {
      budgetBonus = 0.10; // Partial compatibility
      budgetReasonText = `Compatible with your budget plan (${dest.budgetCategory} category)`;
    } else {
      budgetBonus = 0.02;
      budgetReasonText = `Different budget bracket (${dest.budgetCategory} tier)`;
    }

    // 4. Duration Suitability
    const dayDiff = Math.abs(preferences.durationDays - dest.idealDurationDays);
    let durationScore = 0.15;
    let durationReasonText = '';
    if (dayDiff === 0) {
      durationScore = 0.20;
      durationReasonText = `Perfect ${preferences.durationDays}-day duration match for all major highlights`;
    } else if (dayDiff <= 2) {
      durationScore = 0.15;
      durationReasonText = `Ideal for ${preferences.durationDays} days (optimal is ${dest.idealDurationDays} days)`;
    } else {
      durationScore = 0.05;
      durationReasonText = `Can be explored in ${preferences.durationDays} days (standard is ${dest.idealDurationDays} days)`;
    }

    // 5. Composite Final Match Score Calculation (0 - 100%)
    // Weighted formula: 45% Cosine Similarity on interests & vector + 25% Interest coverage + 18% Budget + 12% Duration
    let rawScore = (cosineSim * 45) + (interestCoverage * 25) + (budgetBonus * 100 * 0.18) + (durationScore * 100 * 0.12);

    // Location boost
    if (preferences.location !== 'all' && dest.region === preferences.location) {
      rawScore += 5;
    }

    // Bound between 35% and 99% for realistic recommendations
    const finalScore = Math.min(Math.max(Math.round(rawScore), 35), 99);

    // Construct Explainable AI (XAI) reasons
    const reasons: MatchReason[] = [];

    if (matchedInterests.length > 0) {
      reasons.push({
        category: 'interests',
        title: 'Interest Match',
        detail: `Features ${matchedInterests.map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(', ')} that align with your selected travel passions`,
        scoreContribution: Math.round(interestCoverage * 40)
      });
    }

    reasons.push({
      category: 'budget',
      title: 'Budget Compatibility',
      detail: budgetReasonText,
      scoreContribution: Math.round(budgetBonus * 100)
    });

    reasons.push({
      category: 'duration',
      title: 'Itinerary Fit',
      detail: durationReasonText,
      scoreContribution: Math.round(durationScore * 100)
    });

    if (preferences.location !== 'all') {
      reasons.push({
        category: 'location',
        title: 'Region Preference',
        detail: `Located in ${dest.country} (${dest.region === 'india' ? 'Domestic' : 'International'}) matching your location choice`,
        scoreContribution: 10
      });
    }

    // Detailed vector breakdown for the presentation table
    const vectorBreakdown = featureNames.map((name, index) => {
      const uVal = userVec[index] || 0;
      const dVal = destVec[index] || 0;
      return {
        feature: name,
        userValue: Number(uVal.toFixed(2)),
        destValue: Number(dVal.toFixed(2)),
        product: Number((uVal * dVal).toFixed(2))
      };
    });

    const estimatedTotalBudgetINR = dest.avgCostPerDayINR * preferences.durationDays;
    const estimatedTotalBudgetUSD = dest.avgCostPerDayUSD * preferences.durationDays;

    return {
      destination: dest,
      matchScore: finalScore,
      cosineSimilarity: Number(cosineSim.toFixed(3)),
      reasons,
      estimatedTotalBudgetINR,
      estimatedTotalBudgetUSD,
      vectorBreakdown
    };
  });

  // Sort descending by matchScore
  return results.sort((a, b) => b.matchScore - a.matchScore);
}
