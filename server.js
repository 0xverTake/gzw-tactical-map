import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173', // Autoriser uniquement notre frontend
  credentials: true
}));

// Basic route for testing
app.get('/test', (req, res) => {
  res.json({ message: 'Proxy server is working!' });
});

// Proxy middleware configuration
const proxyOptions = {
  target: 'https://gzwtacmap.online',
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    '^/proxy': '', // remove /proxy path
  },
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173';
    proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
  },
  onError: function (err, req, res) {
    console.error('Proxy Error:', err);
    res.status(500).send('Proxy Error: ' + err.message);
  }
};

// Create the proxy middleware
const proxy = createProxyMiddleware(proxyOptions);

// Use the proxy for requests to /proxy
app.use('/proxy', proxy);

// Error handling
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).send('Server Error: ' + err.message);
});

// Start the server
const PORT = process.env.PORT || 3001;

try {
  app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
    console.log('CORS enabled for:', 'http://localhost:5173');
    console.log('Proxying requests to:', proxyOptions.target);
  });
} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
}
