"""
WanderWise Flask Backend Server
-------------------------------
RESTful API providing:
  - User authentication (Login & Register with SQLite)
  - Travel preferences processing & ML Content-Based Recommendations (scikit-learn)
  - Trip and itinerary management
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from database import init_db, register_user, login_user, save_trip, get_user_trips
from model import recommend_destinations, load_data

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for React frontend

# Initialize SQLite database on startup
init_db()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify backend status."""
    return jsonify({
        'status': 'healthy',
        'service': 'WanderWise Flask + ML Engine',
        'version': '1.0.0'
    })

@app.route('/api/auth/register', methods=['POST'])
def api_register():
    """Register a new user account into SQLite."""
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    password = data.get('password', '').strip()

    if not name or not email or not password:
        return jsonify({'error': 'Name, email, and password are required'}), 400

    result = register_user(name, email, password)
    if result['success']:
        return jsonify(result), 201
    return jsonify(result), 400

@app.route('/api/auth/login', methods=['POST'])
def api_login():
    """Authenticate user with email and password."""
    data = request.get_json() or {}
    email = data.get('email', '').strip()
    password = data.get('password', '').strip()

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    result = login_user(email, password)
    if result['success']:
        return jsonify(result), 200
    return jsonify({'error': result['message']}), 401

@app.route('/api/destinations', methods=['GET'])
def api_get_destinations():
    """Return all destinations from dataset with optional filtering."""
    df = load_data()
    region = request.args.get('region', 'all').lower()
    budget = request.args.get('budget', 'all').lower()
    search = request.args.get('search', '').lower().strip()

    if region != 'all':
        df = df[df['region'].str.lower() == region]
    if budget != 'all':
        df = df[df['budget_level'].str.lower() == budget]
    if search:
        df = df[df['name'].str.lower().str.contains(search) | df['country'].str.lower().str.contains(search)]

    destinations = df.to_dict(orient='records')
    return jsonify({'destinations': destinations, 'count': len(destinations)})

@app.route('/api/recommend', methods=['POST'])
def api_recommend():
    """
    ML Recommendation Endpoint:
    Receives user travel preferences (interests, budget, duration, location)
    and computes Content-Based Recommendations using Cosine Similarity.
    """
    data = request.get_json() or {}
    interests = data.get('interests', ['beaches', 'nature'])
    budget = data.get('budget', 'medium')
    duration = int(data.get('duration', 4))
    location = data.get('location', 'all')

    recommendations = recommend_destinations(
        user_interests=interests,
        user_budget=budget,
        user_duration=duration,
        user_location=location
    )

    return jsonify({
        'preferences': {
            'interests': interests,
            'budget': budget,
            'duration': duration,
            'location': location
        },
        'count': len(recommendations),
        'recommendations': recommendations
    })

@app.route('/api/trips', methods=['GET', 'POST'])
def api_trips():
    """Manage saved user trips in SQLite."""
    if request.method == 'POST':
        data = request.get_json() or {}
        user_id = data.get('user_id', 1)
        dest_name = data.get('destination_name', 'My Dream Trip')
        duration = int(data.get('duration_days', 4))
        budget = data.get('budget_category', 'medium')
        total_cost = float(data.get('total_budget_inr', 12000))
        notes = data.get('notes', '')
        itinerary = str(data.get('itinerary_json', ''))

        trip_id = save_trip(user_id, dest_name, duration, budget, total_cost, notes, itinerary)
        return jsonify({'message': 'Trip saved successfully', 'trip_id': trip_id}), 201

    user_id = request.args.get('user_id', 1)
    trips = get_user_trips(user_id)
    return jsonify({'trips': trips})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"🚀 WanderWise Flask backend starting on http://localhost:{port}")
    app.run(host='0.0.0.0', port=port, debug=True)
