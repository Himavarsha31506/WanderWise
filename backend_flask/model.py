"""
WanderWise Machine Learning Recommendation Engine
--------------------------------------------------
Content-Based Recommendation System using:
  1. pandas for dataset handling
  2. scikit-learn (TfidfVectorizer & cosine_similarity) for mathematical vector space modeling
"""

import os
import pandas as pd
import numpy as np

# Load CSV dataset
CSV_PATH = os.path.join(os.path.dirname(__file__), 'dataset.csv')

def load_data():
    """Load destination dataset into a pandas DataFrame."""
    if os.path.exists(CSV_PATH):
        df = pd.read_csv(CSV_PATH)
    else:
        # Fallback inline data if file missing
        df = pd.DataFrame([
            {
                'id': 1, 'name': 'Goa', 'country': 'India', 'region': 'india',
                'interests': 'beaches food adventure', 'budget_level': 'medium',
                'avg_cost_per_day_inr': 3200, 'ideal_days': 4,
                'popular_attractions': 'Baga Beach;Fort Aguada;Dudhsagar Falls',
                'description': 'Premier beach haven offering golden shores, Portuguese architecture, water sports, and seafood curries.'
            },
            {
                'id': 2, 'name': 'Manali', 'country': 'India', 'region': 'india',
                'interests': 'mountains adventure nature', 'budget_level': 'low',
                'avg_cost_per_day_inr': 2200, 'ideal_days': 4,
                'popular_attractions': 'Solang Valley;Rohtang Pass;Jogini Waterfall',
                'description': 'Snow-capped Himalayan peaks, pine-covered mountain trails, paragliding, and cozy alpine cafes.'
            }
        ])
    return df

def recommend_destinations(user_interests, user_budget, user_duration, user_location='all'):
    """
    Recommend destinations using Content-Based Filtering & Cosine Similarity.
    
    Parameters:
      user_interests (list): ['beaches', 'adventure']
      user_budget (str): 'low', 'medium', or 'high'
      user_duration (int): trip duration in days
      user_location (str): 'india', 'international', or 'all'
      
    Returns:
      list of dicts containing ranked destinations, match percentages, and explanations.
    """
    df = load_data().copy()

    # Step 1: Filter by location if specified
    if user_location != 'all':
        filtered_df = df[df['region'].str.lower() == user_location.lower()]
        if not filtered_df.empty:
            df = filtered_df

    # Step 2: Prepare Content Metadata for each destination
    # We combine interests, budget_level, and keywords into a 'tags' soup
    df['interests_clean'] = df['interests'].apply(lambda x: str(x).replace(',', ' '))
    df['combined_features'] = (
        df['interests_clean'] + ' ' + 
        df['budget_level'] + ' ' + 
        df['description']
    )

    # Step 3: Construct User Profile String
    user_interests_str = " ".join(user_interests)
    user_profile = f"{user_interests_str} {user_budget}"

    # Step 4: Vectorization & Cosine Similarity via scikit-learn
    try:
        from sklearn.feature_extraction.text import TfidfVectorizer
        from sklearn.metrics.pairwise import cosine_similarity

        vectorizer = TfidfVectorizer(stop_words='english')
        # Fit on both destinations and user profile
        all_texts = df['combined_features'].tolist() + [user_profile]
        tfidf_matrix = vectorizer.fit_transform(all_texts)

        # Last vector is the user profile
        user_vector = tfidf_matrix[-1]
        dest_vectors = tfidf_matrix[:-1]

        # Calculate cosine similarity: Cos(theta) = (A . B) / (||A|| * ||B||)
        similarity_scores = cosine_similarity(user_vector, dest_vectors).flatten()
    except ImportError:
        # Fallback pure-Python mathematical implementation if sklearn not installed
        similarity_scores = []
        user_words = set((user_interests_str + " " + user_budget).lower().split())
        for _, row in df.iterrows():
            dest_words = set(row['combined_features'].lower().split())
            intersection = user_words.intersection(dest_words)
            union = user_words.union(dest_words)
            jaccard_sim = len(intersection) / len(union) if union else 0.0
            similarity_scores.append(jaccard_sim)
        similarity_scores = np.array(similarity_scores)

    # Step 5: Heuristic Scoring & Explanation Generation
    recommendations = []
    for idx, (_, row) in enumerate(df.iterrows()):
        base_sim = float(similarity_scores[idx])

        # Budget match bonus
        budget_bonus = 0.20 if row['budget_level'] == user_budget else 0.05
        
        # Duration match score (penalize large deviations from ideal_days)
        ideal_days = int(row['ideal_days'])
        day_diff = abs(user_duration - ideal_days)
        duration_bonus = 0.15 if day_diff == 0 else max(0.05, 0.15 - (day_diff * 0.03))

        # Composite Match Score (0 - 100%)
        composite_score = (base_sim * 50) + (budget_bonus * 30) + (duration_bonus * 20)
        final_score = min(max(int(composite_score * 100), 40), 99)

        # Build Explainable AI reasons
        reasons = []
        matched_interests = [i for i in user_interests if i in str(row['interests']).lower()]
        if matched_interests:
            reasons.append(f"Direct match for your interest in {', '.join(matched_interests).title()}")
        if row['budget_level'] == user_budget:
            reasons.append(f"Fits your {user_budget.upper()} budget tier (Avg ₹{row['avg_cost_per_day_inr']}/day)")
        if day_diff <= 1:
            reasons.append(f"Ideal duration: {user_duration} days matches recommended {ideal_days} days")

        recommendations.append({
            'id': int(row['id']),
            'name': row['name'],
            'country': row['country'],
            'region': row['region'],
            'budget_level': row['budget_level'],
            'avg_cost_per_day_inr': int(row['avg_cost_per_day_inr']),
            'ideal_days': ideal_days,
            'popular_attractions': str(row['popular_attractions']).split(';'),
            'description': row['description'],
            'cosine_similarity': round(base_sim, 3),
            'match_score': final_score,
            'reasons': reasons,
            'estimated_total_cost': int(row['avg_cost_per_day_inr']) * user_duration
        })

    # Sort descending by match_score
    recommendations.sort(key=lambda x: x['match_score'], reverse=True)
    return recommendations

if __name__ == '__main__':
    # Test execution
    test_prefs = {
        'user_interests': ['beaches', 'adventure'],
        'user_budget': 'medium',
        'user_duration': 4,
        'user_location': 'india'
    }
    print("Testing ML Recommendation Model...")
    results = recommend_destinations(**test_prefs)
    for r in results[:3]:
        print(f"-> {r['name']} ({r['country']}): {r['match_score']}% Match | Reasons: {r['reasons']}")
