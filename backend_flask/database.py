"""
WanderWise SQLite Database Module
---------------------------------
Simple, beginner-friendly SQLite database wrapper for college presentation.
Features:
  - Automated table creation (users, trips, destinations)
  - User registration and authentication
  - Saving and retrieving user itineraries and trips
"""

import sqlite3
import os
import hashlib

DB_PATH = os.path.join(os.path.dirname(__file__), 'wanderwise.db')

def get_connection():
    """Create and return a database connection."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # Enables column access by name
    return conn

def hash_password(password):
    """Simple SHA-256 password hash for beginner security."""
    return hashlib.sha256(password.encode()).hexdigest()

def init_db():
    """Initialize database tables."""
    conn = get_connection()
    cursor = conn.cursor()

    # 1. Users Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # 2. Trips Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS trips (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            destination_name TEXT NOT NULL,
            duration_days INTEGER NOT NULL,
            budget_category TEXT NOT NULL,
            total_budget_inr REAL,
            notes TEXT,
            itinerary_json TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    ''')

    # Seed demo user if empty
    cursor.execute('SELECT COUNT(*) FROM users WHERE email = ?', ('demo@wanderwise.com',))
    if cursor.fetchone()[0] == 0:
        cursor.execute(
            'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
            ('Demo Traveler', 'demo@wanderwise.com', hash_password('password123'))
        )
        conn.commit()

    conn.close()
    print("SQLite database initialized successfully at:", DB_PATH)

def register_user(name, email, password):
    """Register a new user in SQLite."""
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
            (name, email, hash_password(password))
        )
        conn.commit()
        user_id = cursor.lastrowid
        return {'success': True, 'user_id': user_id, 'name': name, 'email': email}
    except sqlite3.IntegrityError:
        return {'success': False, 'message': 'Email already exists'}
    finally:
        conn.close()

def login_user(email, password):
    """Authenticate user with email and password."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        'SELECT id, name, email FROM users WHERE email = ? AND password_hash = ?',
        (email, hash_password(password))
    )
    row = cursor.fetchone()
    conn.close()
    if row:
        return {'success': True, 'user': dict(row)}
    return {'success': False, 'message': 'Invalid credentials'}

def save_trip(user_id, destination_name, duration_days, budget_category, total_budget_inr, notes, itinerary_json=""):
    """Save an itinerary to SQLite."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO trips (user_id, destination_name, duration_days, budget_category, total_budget_inr, notes, itinerary_json)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (user_id, destination_name, duration_days, budget_category, total_budget_inr, notes, itinerary_json))
    conn.commit()
    trip_id = cursor.lastrowid
    conn.close()
    return trip_id

def get_user_trips(user_id):
    """Fetch all saved trips for a user."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM trips WHERE user_id = ? ORDER BY created_at DESC', (user_id,))
    trips = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return trips

if __name__ == '__main__':
    init_db()
