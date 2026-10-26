# 🌍 WanderWise – Smart Tourism Planner
**A Full Stack Development (FSD) + Machine Learning (ML) Academic & Production Project**

---

## 📌 Project Overview
**WanderWise** is a full-stack smart tourism recommendation and itinerary planning web application. It bridges frontend web technologies, backend REST APIs, a lightweight relational database (SQLite), and a machine learning recommendation system powered by **scikit-learn** and **pandas**.

---

## 📂 Project Architecture & Folder Structure

```text
wanderwise/
│
├── backend_flask/              # Python Backend & ML System
│   ├── app.py                  # Flask REST API endpoints (Auth, Recommender, Trips)
│   ├── model.py                # Scikit-learn Content-Based Filtering & Cosine Similarity
│   ├── database.py             # SQLite database manager (users, trips)
│   ├── dataset.csv             # Destination dataset with features & costs
│   ├── requirements.txt        # Python pip dependencies
│   └── wanderwise.db           # SQLite database (auto-generated)
│
├── src/                        # Modern React + Vite Frontend
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.tsx          # Navigation bar with active state & auth
│   │   ├── HeroSection.tsx     # Hero banner with "Discover Your Next Adventure!"
│   │   ├── RecommendationCard.tsx # ML Match score card with XAI explanations
│   │   ├── DestinationDetailModal.tsx # Full destination details & attractions
│   │   ├── ExploreView.tsx     # Search, filter by budget, interest, location
│   │   ├── MyTripsView.tsx     # Saved destinations, day-by-day itinerary & budget
│   │   ├── AuthModal.tsx       # Register & Login modal
│   │   ├── CollegeVivaGuideModal.tsx # Interactive presentation & viva lab guide
│   │   └── Footer.tsx          # Travel themed footer
│   ├── data/
│   │   └── destinations.ts     # Curated dataset for client-side fallback
│   ├── services/
│   │   ├── mlRecommender.ts    # Client-side mirror of Cosine Similarity ML algorithm
│   │   └── storageService.ts   # LocalStorage & API persistence layer
│   ├── types/
│   │   └── travel.ts           # TypeScript interfaces & domain types
│   ├── App.tsx                 # Main application state and page routing
│   ├── main.tsx                # React entry point
│   └── index.css               # Tailwind CSS styles
│
├── server.ts                   # Node.js Express server with Vite middleware integration
├── package.json                # Frontend & full-stack dependencies
└── README.md                   # Project documentation
```

---

## 🧠 Machine Learning Engine: How It Works

### 1. Algorithm: Content-Based Filtering
Unlike Collaborative Filtering (which requires thousands of users' prior ratings and suffers from the **Cold-Start Problem**), Content-Based Filtering models each destination's intrinsic attributes (interests, budget level, ideal duration) and compares them against the user's active travel query.

### 2. Mathematical Foundation: Cosine Similarity
Every destination is mapped into an $n$-dimensional vector space $\mathbf{d}$, and user preferences are mapped into vector $\mathbf{u}$.

The angle $\theta$ between the vectors defines their similarity:

$$\text{Cosine Similarity}(\mathbf{u}, \mathbf{d}) = \cos(\theta) = \frac{\mathbf{u} \cdot \mathbf{d}}{\|\mathbf{u}\| \|\mathbf{d}\|} = \frac{\sum_{i=1}^{n} u_i \cdot d_i}{\sqrt{\sum_{i=1}^{n} u_i^2} \sqrt{\sum_{i=1}^{n} d_i^2}}$$

- **1.0**: Perfect alignment
- **0.0**: Orthogonal (completely unrelated)

### 3. Heuristic Weighting & Explainable AI (XAI)
The final match score (0 - 100%) integrates:
- **45%**: Cosine similarity on interest tags & semantic features
- **25%**: User interest coverage percentage
- **18%**: Budget tier compatibility (bonus for exact match)
- **12%**: Trip duration fit (gaussian penalty based on difference from ideal days)

---

## 🛠️ Step-by-Step Instructions to Run Locally

### Option 1: Running the Complete Full-Stack Web App (Recommended)
1. Ensure **Node.js (v18+)** is installed.
2. In the project root, install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`.

---

### Option 2: Running the Python Flask + ML Backend Locally
1. Ensure **Python 3.9+** and `pip` are installed.
2. Navigate to the `backend_flask` directory:
   ```bash
   cd backend_flask
   ```
3. (Optional) Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
4. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Test the ML model directly from CLI:
   ```bash
   python model.py
   ```
6. Run the Flask server:
   ```bash
   python app.py
   ```
   The Flask API will run on `http://127.0.0.1:5000`.

---

## 🎓 College Viva & Interview Preparation Guide

### Q1: What is Content-Based Recommendation System?
> **Answer**: It recommends items by comparing item features (such as tags: beaches, adventure, budget tier) with user profile preferences. It does not depend on other users' ratings.

### Q2: Why did you choose Content-Based Filtering over Collaborative Filtering?
> **Answer**: In tourism apps, new users have no historical trip ratings. Collaborative filtering suffers from the **Cold-Start Problem** when new users or items arrive. Content-Based filtering immediately gives accurate recommendations based on user-stated interests and budget.

### Q3: What is Cosine Similarity and why is it preferred over Euclidean Distance?
> **Answer**: Cosine similarity measures the orientation (angle) of two vectors rather than their magnitude. In text and categorical feature spaces, a user who selects 2 interests should match well with a destination having 4 interests if their core tags overlap, regardless of vector length differences.

### Q4: How is SQLite integrated in the project?
> **Answer**: SQLite is an embedded, zero-configuration relational database engine. We use Python’s built-in `sqlite3` module to persist `users` and `trips` tables without needing external database server configuration.
