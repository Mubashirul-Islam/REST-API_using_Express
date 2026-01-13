const Flight = require('../models/Flight');
const Attraction = require('../models/Attraction');
const GeoInfo = require('../models/GeoInfo');

class SearchController {
    /**
     * Search endpoint - Returns flights and attractions for a location
     * GET /search/:locationname
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async search(req, res) {
        try {
            const { locationname } = req.params;

            // Validate locationname parameter
            if (!locationname) {
                return res.status(400).json({
                    success: false,
                    message: 'Location is required'
                });
            }

            // Fetch geographic the location
            const geoInfo = await GeoInfo.findByLocation(locationname);

            // Fetch flights for the location
            const flights = await Flight.findByLocation(locationname);

            // Fetch attractions for the location
            const attractions = await Attraction.findByLocation(locationname);

            // Prepare response
            const response = {
                success: true,
                GeoInfo: geoInfo,
                Flights: flights,
                Attractions: attractions
            };

            res.status(200).json(response);
        } catch (error) {
            console.error('Search error:', error);
            res.status(500).json({
                success: false,
                message: 'Error searching for locationname',
                error: error.message
            });
        }
    }
}

module.exports = SearchController;