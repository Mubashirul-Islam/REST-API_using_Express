const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const pool = require('./config/database');
const DataInitializer = require('./data_retrival');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Middleware Configuration
 */
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

/**
 * Request logging middleware (optional but helpful)
 */
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

/**
 * Health check endpoint
 */
app.get('/health', async (req, res) => {
    try {
        // Test database connection
        await pool.query('SELECT NOW()');
        res.status(200).json({
            success: true,
            message: 'Server is healthy',
            database: 'connected',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server is unhealthy',
            database: 'disconnected',
            error: error.message
        });
    }
});

/**
 * API Routes
 */
app.use('/', routes);

/**
 * Error handling middleware
 */
app.use(notFoundHandler);
app.use(errorHandler);

/**
 * Start server
 */
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

//DataInitializer.initializeData();

/**
 * Graceful shutdown
 */
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully...');
    await pool.end();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully...');
    await pool.end();
    process.exit(0);
});

module.exports = app;