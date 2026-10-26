import express from 'express';
import { createServer as createViteServer } from 'vite';
import { DESTINATIONS_DATA } from './src/data/destinations';
import { recommendDestinations } from './src/services/mlRecommender';
import { UserPreferences } from './src/types/travel';
import fs from 'fs';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      app: 'WanderWise – Smart Tourism Planner',
      engine: 'Machine Learning Content-Based Recommender'
    });
  });

  // Destinations API
  app.get('/api/destinations', (req, res) => {
    const { region, budget, search } = req.query;
    let list = [...DESTINATIONS_DATA];

    if (region && region !== 'all') {
      list = list.filter(d => d.region === String(region).toLowerCase());
    }
    if (budget && budget !== 'all') {
      list = list.filter(d => d.budgetCategory === String(budget).toLowerCase());
    }
    if (search) {
      const q = String(search).toLowerCase();
      list = list.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.interests.some(i => i.toLowerCase().includes(q))
      );
    }
    res.json({ destinations: list, total: list.length });
  });

  // Specific destination
  app.get('/api/destinations/:id', (req, res) => {
    const dest = DESTINATIONS_DATA.find(d => d.id === req.params.id);
    if (!dest) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.json(dest);
  });

  // ML Recommendations API
  app.post('/api/recommendations', (req, res) => {
    try {
      const preferences: UserPreferences = {
        interests: req.body.interests || ['beaches', 'nature'],
        budget: req.body.budget || 'medium',
        durationDays: Number(req.body.durationDays) || 4,
        location: req.body.location || 'all'
      };

      const results = recommendDestinations(preferences, DESTINATIONS_DATA);
      res.json({
        preferences,
        total: results.length,
        recommendations: results
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Recommendation calculation failed', message: err.message });
    }
  });

  // Mount Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production build
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🚀 WanderWise server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start WanderWise server:', err);
});
