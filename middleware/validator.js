/**
 * Validate location name parameter
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware
 */
const validateLocation = (req, res, next) => {
    const { locationname } = req.params;

    if (!locationname) {
        return res.status(400).json({
            success: false,
            message: 'Location name cannot be empty'
        });
    }

    // Validate location is in allowed list
    const validLocations = ['barcelona', 'london', 'madrid'];

    if (!validLocations.includes(locationname)) {
        return res.status(400).json({
            success: false,
            message: 'Location must be one of: barcelona, london, madrid'
        });
    }

    next();
};

/**
 * Validate details request parameters
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware
 */
const validateDetailsRequest = (req, res, next) => {
    const { id } = req.params;
    const { searchtype } = req.query;

    // Validate ID
    if (!id || isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID parameter'
        });
    }

    const numericId = parseInt(id, 10);
    if (numericId < 1 || numericId > 3) {
        return res.status(400).json({
            success: false,
            message: 'ID must be between 1 and 3'
        });
    }

    // Validate search type
    if (!searchtype) {
        return res.status(400).json({
            success: false,
            message: 'searchtype query parameter is required'
        });
    }

    const validTypes = ['flight', 'attraction'];
    if (!validTypes.includes(searchtype.toLowerCase())) {
        return res.status(400).json({
            success: false,
            message: 'searchtype must be either "flight" or "attraction"'
        });
    }

    next();
};

module.exports = {
    validateLocation,
    validateDetailsRequest
};