const Flight = require('../models/Flight');
const Attraction = require('../models/Attraction');
const GeoInfo = require('../models/GeoInfo');

class DetailsController {
    /**
     * Details endpoint - Returns flight or attraction details by ID
     * GET /details/:id?searchtype=flight/attraction
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async getDetails(req, res) {
        try {
            const { id } = req.params;
            const { searchtype } = req.query;

            // Validate parameters
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required'
                });
            }

            if (!searchtype || !['flight', 'attraction'].includes(searchtype.toLowerCase())) {
                return res.status(400).json({
                    success: false,
                    message: 'Search type must be either "flight" or "attraction"'
                });
            }

            let response;

            // Handle flight search
            if (searchtype.toLowerCase() === 'flight') {
                const flight = await Flight.findById(id);

                if (!flight) {
                    return res.status(404).json({
                        success: false,
                        message: 'Flight not found'
                    });
                }

                // Get geographic info for the flight location
                const geoInfo = await GeoInfo.findByLocation(flight.location);

                response = {
                    success: true,
                    GeoInfo: geoInfo,
                    Flight: flight
                };
            }
            // Handle attraction search
            else if (searchtype.toLowerCase() === 'attraction') {
                const attraction = await Attraction.findById(id);

                if (!attraction) {
                    return res.status(404).json({
                        success: false,
                        message: 'Attraction not found'
                    });
                }

                // Get geographic info for the attraction location
                const geoInfo = await GeoInfo.findByLocation(attraction.city);

                response = {
                    success: true,
                    GeoInfo: geoInfo,
                    Attraction: attraction
                };
            }

            res.status(200).json(response);
        } catch (error) {
            console.error('Details error:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching details',
                error: error.message
            });
        }
    }
}

module.exports = DetailsController;