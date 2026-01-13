/**
 * Global error handling middleware
 * Catches all errors and sends appropriate response
 * @param {Error} err - Error object
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware function
 */
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message: message,
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

/**
 * Handle 404 errors for undefined routes
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
};

module.exports = {
    errorHandler,
    notFoundHandler
};