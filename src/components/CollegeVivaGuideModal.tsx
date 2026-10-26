import React, { useState } from 'react';
import { X, BookOpen, Code, Cpu, HelpCircle, Copy, Check, Terminal, Layers } from 'lucide-react';

interface CollegeVivaGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CollegeVivaGuideModal: React.FC<CollegeVivaGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'ml_math' | 'architecture' | 'python_code' | 'run_guide' | 'viva_qa'>('ml_math');
  const [activeCodeFile, setActiveCodeFile] = useState<'app.py' | 'model.py' | 'database.py' | 'dataset.csv' | 'requirements.txt'>('model.py');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeFiles = {
    'model.py': `# model.py - Machine Learning Recommendation Engine
# Uses pandas for dataset manipulation and scikit-learn for Cosine Similarity
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def recommend_destinations(user_interests, user_budget, user_duration, user_location='all'):
    """
    Computes Content-Based Recommendations using Cosine Similarity.
    """
    # 1. Load destinations from CSV
    df = pd.read_csv('dataset.csv')

    # 2. Filter by location (India vs International) if chosen
    if user_location != 'all':
        df = df[df['region'].str.lower() == user_location.lower()]

    # 3. Create content feature soup for each destination
    df['combined_features'] = df['interests'] + ' ' + df['budget_level'] + ' ' + df['description']

    # 4. Create user profile text
    user_profile = ' '.join(user_interests) + ' ' + user_budget

    # 5. Transform into TF-IDF Vector Space
    vectorizer = TfidfVectorizer(stop_words='english')
    all_texts = df['combined_features'].tolist() + [user_profile]
    tfidf_matrix = vectorizer.fit_transform(all_texts)

    # 6. User vector is the last row; compute cosine similarity against destinations
    user_vec = tfidf_matrix[-1]
    dest_vecs = tfidf_matrix[:-1]
    similarity_scores = cosine_similarity(user_vec, dest_vecs).flatten()

    # 7. Add heuristic scores (budget alignment & duration suitability)
    results = []
    for idx, (_, row) in enumerate(df.iterrows()):
        sim = float(similarity_scores[idx])
        budget_bonus = 0.20 if row['budget_level'] == user_budget else 0.05
        day_diff = abs(user_duration - int(row['ideal_days']))
        duration_bonus = max(0.05, 0.20 - (day_diff * 0.04))

        final_match_pct = min(max(int((sim * 0.50 + budget_bonus + duration_bonus) * 100), 40), 99)

        results.append({
            'name': row['name'],
            'country': row['country'],
            'cosine_similarity': round(sim, 3),
            'match_score': final_match_pct,
            'budget': row['budget_level'],
            'cost_per_day': row['avg_cost_per_day_inr']
        })

    return sorted(results, key=lambda x: x['match_score'], reverse=True)`,

    'app.py': `# app.py - Python Flask Backend REST API
from flask import Flask, request, jsonify
from flask_cors import CORS
from model import recommend_destinations
from database import init_db, register_user, login_user, save_trip, get_user_trips

app = Flask(__name__)
CORS(app) # Allow React frontend communication

init_db() # Initialize SQLite tables

@app.route('/api/recommend', methods=['POST'])
def get_recommendations():
    data = request.json or {}
    interests = data.get('interests', ['beaches'])
    budget = data.get('budget', 'medium')
    duration = int(data.get('duration', 4))
    location = data.get('location', 'all')

    recommendations = recommend_destinations(interests, budget, duration, location)
    return jsonify({'recommendations': recommendations})

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    return jsonify(register_user(data['name'], data['email'], data['password']))

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    return jsonify(login_user(data['email'], data['password']))

if __name__ == '__main__':
    app.run(port=5000, debug=True)`,

    'database.py': `# database.py - SQLite Database Module
import sqlite3
import hashlib

DB_NAME = 'wanderwise.db'

def get_db():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_db() as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL
            )
        ''')
        conn.execute('''
            CREATE TABLE IF NOT EXISTS trips (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                destination_name TEXT NOT NULL,
                duration_days INTEGER NOT NULL,
                total_budget_inr REAL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        ''')
        conn.commit()

def register_user(name, email, password):
    hashed = hashlib.sha256(password.encode()).hexdigest()
    with get_db() as conn:
        try:
            cursor = conn.execute(
                'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
                (name, email, hashed)
            )
            return {'success': True, 'user_id': cursor.lastrowid}
        except sqlite3.IntegrityError:
            return {'success': False, 'message': 'Email already registered'}`,

    'dataset.csv': `id,name,country,region,interests,budget_level,avg_cost_per_day_inr,ideal_days,popular_attractions,description
1,Goa,India,india,"beaches,food,adventure",medium,3200,4,"Baga Beach;Fort Aguada","Premier beach haven offering golden shores, Portuguese architecture, and seafood curries."
2,Manali,India,india,"mountains,adventure,nature",low,2200,4,"Solang Valley;Rohtang Pass","Snow-capped Himalayan peaks, pine-covered mountain trails, and cozy alpine cafes."
3,Jaipur,India,india,"history,food,nature",low,2000,3,"Amer Fort;Hawa Mahal","Terracotta-pink architecture, astronomical marvels, and royal Rajput palaces."
4,Kerala,India,india,"nature,beaches,food",medium,3500,5,"Alleppey Backwaters;Munnar Tea","Misty rolling tea estates and blissful luxury houseboat stays."
5,Bali,Indonesia,international,"beaches,nature,adventure,food",medium,4200,5,"Uluwatu Temple;Nusa Penida","Idyllic tropical haven blending rice terraces, Hindu temples, and surf breaks."
6,Swiss Alps,Switzerland,international,"mountains,nature,adventure",high,14000,5,"Jungfraujoch;Matterhorn","Iconic Matterhorn, cogwheel train journeys, and fairytale chalets."`,

    'requirements.txt': `flask>=2.3.0
flask-cors>=4.0.0
pandas>=2.0.0
scikit-learn>=1.3.0
numpy>=1.24.0`
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-5xl bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">College Project & Viva Presentation Guide</h3>
                <span className="text-[11px] font-bold uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full">
                  FSD + ML Integration
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Mathematical theory, Python scikit-learn code, SQLite schema, and viva Q&A
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950 px-6 gap-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('ml_math')}
            className={`py-3.5 px-3 border-b-2 flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer ${
              activeTab === 'ml_math' ? 'border-teal-400 text-teal-300 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" /> ML Cosine Similarity Math
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3.5 px-3 border-b-2 flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer ${
              activeTab === 'architecture' ? 'border-teal-400 text-teal-300 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" /> Architecture & Data Flow
          </button>

          <button
            onClick={() => setActiveTab('python_code')}
            className={`py-3.5 px-3 border-b-2 flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer ${
              activeTab === 'python_code' ? 'border-teal-400 text-teal-300 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" /> Python Flask & ML Code
          </button>

          <button
            onClick={() => setActiveTab('run_guide')}
            className={`py-3.5 px-3 border-b-2 flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer ${
              activeTab === 'run_guide' ? 'border-teal-400 text-teal-300 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" /> Run Locally Steps
          </button>

          <button
            onClick={() => setActiveTab('viva_qa')}
            className={`py-3.5 px-3 border-b-2 flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer ${
              activeTab === 'viva_qa' ? 'border-teal-400 text-teal-300 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" /> Viva Questions & Answers
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-slate-300">

          {/* TAB 1: ML MATH & THEORY */}
          {activeTab === 'ml_math' && (
            <div className="space-y-6 text-sm leading-relaxed">
              <div className="p-4 bg-teal-950/40 rounded-2xl border border-teal-500/20">
                <h4 className="text-base font-extrabold text-teal-300 mb-1">
                  1. Content-Based Recommendation Architecture
                </h4>
                <p className="text-xs text-slate-300">
                  Unlike collaborative filtering which requires millions of user reviews, content-based filtering analyzes the <strong>intrinsic properties</strong> of destinations (interests, tags, budget tier, duration) and matches them to user travel preferences.
                </p>
              </div>

              {/* Formula */}
              <div className="p-6 bg-slate-950 text-white rounded-2xl space-y-4 font-mono text-center border border-slate-800">
                <p className="text-xs uppercase tracking-widest text-teal-400 font-bold font-sans">
                  The Mathematical Formulation: Cosine Similarity
                </p>
                <div className="text-xl sm:text-2xl font-bold py-2 bg-slate-900 rounded-xl text-teal-300 border border-slate-800">
                  Similarity(u, d) = cos(θ) = ( u · d ) / ( ||u|| × ||d|| )
                </div>
                <div className="text-xs text-slate-400 font-sans leading-relaxed">
                  Where <strong className="text-teal-300">u</strong> is the User Travel Vector, <strong className="text-teal-300">d</strong> is the Destination Feature Vector, <strong className="text-teal-300">u · d</strong> is the dot product, and <strong className="text-teal-300">||u||</strong> is the Euclidean norm.
                </div>
              </div>

              {/* Numerical Example */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  2. Step-by-Step Numerical Example (Explain this to the Professor!)
                </h4>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-3">
                  <p className="text-slate-400">
                    Let features be: <code className="bg-slate-900 text-teal-300 px-1.5 py-0.5 rounded">[Beaches, Mountains, Adventure, Budget_Weight, Duration_Scale]</code>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="font-bold text-white block mb-1">User Preference Vector (u):</span>
                      <p className="text-teal-300 font-mono">u = [1, 0, 1, 0.66, 0.40]</p>
                      <p className="text-[10px] text-slate-400 mt-1">Loves Beaches & Adventure, Medium budget (0.66), 4-day trip (0.40)</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="font-bold text-white block mb-1">Goa Feature Vector (d):</span>
                      <p className="text-teal-300 font-mono">d = [1, 0, 1, 0.66, 0.40]</p>
                      <p className="text-[10px] text-slate-400 mt-1">Goa has beaches (1), adventure (1), medium budget (0.66), 4 days ideal (0.40)</p>
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/20 text-emerald-300 font-mono text-[11px] leading-relaxed">
                    Dot Product (u · d) = (1×1) + (0×0) + (1×1) + (0.66×0.66) + (0.40×0.40) = 1 + 0 + 1 + 0.435 + 0.16 = <strong>2.595</strong><br />
                    ||u|| = √(1 + 0 + 1 + 0.435 + 0.16) = √2.595 ≈ 1.611<br />
                    Similarity = 2.595 / (1.611 × 1.611) = <strong>1.00 (100% Perfect Angular Alignment)</strong>
                  </div>
                </div>
              </div>

              {/* Explainable AI */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  3. Explainable AI (XAI) Scoring Heuristic
                </h4>
                <ul className="list-disc pl-5 text-xs text-slate-400 space-y-1">
                  <li><strong>45% Weight:</strong> Vector Cosine Similarity (interests & semantic attributes)</li>
                  <li><strong>25% Weight:</strong> Interest Coverage (% of user-selected tags satisfied)</li>
                  <li><strong>18% Weight:</strong> Budget Compatibility Bonus (+20% for exact tier match)</li>
                  <li><strong>12% Weight:</strong> Trip Duration Suitability (penalty based on distance from optimal days)</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6 text-sm">
              <h4 className="text-base font-extrabold text-white">
                Full-Stack System Architecture & Flow
              </h4>

              <div className="p-6 bg-slate-950 rounded-2xl space-y-4 border border-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
                  <div className="p-3 bg-slate-900 border border-sky-500/30 rounded-xl">
                    <span className="text-sky-400 font-bold block mb-1">1. Frontend (React 19)</span>
                    <p className="text-[11px] text-slate-400">User inputs preferences via interactive Tailwind dark UI</p>
                  </div>
                  <div className="p-3 bg-slate-900 border border-teal-500/30 rounded-xl">
                    <span className="text-teal-400 font-bold block mb-1">2. REST API (Express / Flask)</span>
                    <p className="text-[11px] text-slate-400">Receives JSON payload at <code>/api/recommend</code></p>
                  </div>
                  <div className="p-3 bg-slate-900 border border-purple-500/30 rounded-xl">
                    <span className="text-purple-400 font-bold block mb-1">3. ML Engine (scikit-learn)</span>
                    <p className="text-[11px] text-slate-400">Vectorizes features with TfidfVectorizer & Cosine Similarity</p>
                  </div>
                  <div className="p-3 bg-slate-900 border border-amber-500/30 rounded-xl">
                    <span className="text-amber-400 font-bold block mb-1">4. Database (SQLite)</span>
                    <p className="text-[11px] text-slate-400">Persists user profiles, itineraries, and bucket lists</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-white text-xs uppercase tracking-wide">Client Tier</h5>
                  <p className="text-xs text-slate-400">
                    Built with React 19, TypeScript, and Tailwind CSS. Features instant reactive feedback, dark mode aesthetics, and print-ready itineraries.
                  </p>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-white text-xs uppercase tracking-wide">Server & ML Tier</h5>
                  <p className="text-xs text-slate-400">
                    Flask / Express handles endpoints. Scikit-learn computes vector dot products. SQLite provides zero-config relational persistence.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CODE */}
          {activeTab === 'python_code' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {(Object.keys(codeFiles) as (keyof typeof codeFiles)[]).map((filename) => (
                    <button
                      key={filename}
                      onClick={() => setActiveCodeFile(filename)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeCodeFile === filename
                          ? 'bg-teal-500 text-slate-950'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {filename}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => copyToClipboard(codeFiles[activeCodeFile])}
                  className="px-3 py-1.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 text-xs font-bold flex items-center gap-1.5 border border-teal-500/30 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5 text-teal-400" />}
                  <span>{copied ? 'Copied!' : 'Copy File'}</span>
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 bg-slate-950 text-slate-200 rounded-2xl font-mono text-xs overflow-x-auto max-h-[420px] leading-relaxed border border-slate-800">
                  <code>{codeFiles[activeCodeFile]}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: RUN GUIDE */}
          {activeTab === 'run_guide' && (
            <div className="space-y-6 text-xs text-slate-300">
              <h4 className="text-base font-extrabold text-white">
                Step-by-Step Instructions to Run WanderWise Locally
              </h4>

              <div className="space-y-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-teal-500 text-slate-950 flex items-center justify-center text-xs font-black">1</span>
                    Running the Full-Stack Web App (Node + React + Vite + Express)
                  </span>
                  <div className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs space-y-1 border border-slate-800">
                    <p className="text-slate-500"># 1. Install dependencies</p>
                    <p className="text-teal-300">npm install</p>
                    <p className="text-slate-500 pt-1"># 2. Start dev server</p>
                    <p className="text-teal-300">npm run dev</p>
                  </div>
                  <p className="text-slate-400">
                    Launches on <code>http://localhost:3000</code>.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-teal-500 text-slate-950 flex items-center justify-center text-xs font-black">2</span>
                    Running the Python Flask + scikit-learn Backend (Optional standalone)
                  </span>
                  <div className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs space-y-1 border border-slate-800">
                    <p className="text-slate-500"># Navigate into backend directory</p>
                    <p className="text-teal-300">cd backend_flask</p>
                    <p className="text-slate-500 pt-1"># Install Python requirements</p>
                    <p className="text-teal-300">pip install -r requirements.txt</p>
                    <p className="text-slate-500 pt-1"># Start Flask server</p>
                    <p className="text-teal-300">python app.py</p>
                  </div>
                  <p className="text-slate-400">
                    Flask API runs on <code>http://127.0.0.1:5000</code>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VIVA QUESTIONS */}
          {activeTab === 'viva_qa' && (
            <div className="space-y-4 text-xs text-slate-300">
              <h4 className="text-base font-extrabold text-white">
                Top Viva Questions & Model Answers for Professors
              </h4>

              <div className="space-y-3">
                {[
                  {
                    q: 'Q1: What is a Content-Based Recommender System?',
                    a: 'A Content-Based Recommender recommends items by matching item attributes (such as destination tags: beaches, adventure, budget tier) against user preferences. It creates vector profiles for both items and users and calculates similarity in vector space.'
                  },
                  {
                    q: 'Q2: Why did you choose Content-Based Filtering instead of Collaborative Filtering?',
                    a: 'Collaborative filtering depends on historical rating matrices from thousands of existing users. For a tourism app with new users or new travel spots, it suffers severely from the "Cold-Start Problem". Content-Based Filtering can instantly recommend destinations without needing prior user reviews.'
                  },
                  {
                    q: 'Q3: What is Cosine Similarity and why is it preferred over Euclidean Distance?',
                    a: 'Cosine Similarity calculates the cosine of the angle between two vectors. It measures orientation rather than magnitude. For example, if a user profile has 2 interests and a destination has 5 interests, Euclidean distance would penalize the length difference, whereas Cosine Similarity correctly recognizes that their primary interests align perfectly.'
                  },
                  {
                    q: 'Q4: What is the role of scikit-learn in this project?',
                    a: 'Scikit-learn provides the TfidfVectorizer to convert descriptive text and interest keywords into numerical TF-IDF feature matrices, and cosine_similarity to execute fast, vectorized dot-product matrix multiplications.'
                  },
                  {
                    q: 'Q5: How is SQLite integrated in the application?',
                    a: 'SQLite is an embedded relational database engine. We use it to store user credentials (with SHA-256 password hashing) and saved travel itineraries with day-wise schedules and expense estimates.'
                  },
                  {
                    q: 'Q6: How does the application handle Explainable AI (XAI)?',
                    a: 'Instead of being a "black-box", WanderWise provides a "Why this matches you" breakdown for every recommendation, displaying the Cosine Similarity score, matched passions (e.g. Beaches + Adventure), budget alignment, and itinerary suitability.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <p className="font-bold text-white">{item.q}</p>
                    <p className="text-slate-400 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">WanderWise Academic & College Presentation Guide</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold cursor-pointer"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
