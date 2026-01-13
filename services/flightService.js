const axios = require('axios');
const Flight = require('../models/Flight');
const GeoInfo = require('../models/GeoInfo');

class FlightService {
    /**
     * Search for airport ID by location
     * @param {String} location - Location name
     * @returns {Promise} Airport ID
     */
    static async searchAirportId(location) {
        try {
            const options = {
                method: 'GET',
                url: `https://${process.env.BOOKING_API_HOST}/api/v1/flights/searchDestination`,
                params: { query: location },
                headers: {
                    'X-RapidAPI-Key': process.env.BOOKING_API_KEY,
                    'X-RapidAPI-Host': process.env.BOOKING_API_HOST
                }
            };

            const response = await axios.request(options);

            // Extract airport ID from response
            return response.data.data[0].id;
        } catch (error) {
            console.error('Error searching airport:', error.message);
            throw new Error('Failed to search airport');
        }
    }

    /**
     * Fetch flights using airport ID
     * @param {String} airportId - Airport ID
     * @returns {Promise} Flight token
     */
    static async fetchFlightToken(fromId, toId) {
        try {
            const options = {
                method: 'GET',
                url: `https://${process.env.BOOKING_API_HOST}/api/v1/flights/searchFlights`,
                params: {
                    fromId: fromId,
                    toId: toId,
                    departDate: new Date().toISOString().split("T")[0],
                    // Add other required parameters
                },
                headers: {
                    'X-RapidAPI-Key': process.env.BOOKING_API_KEY,
                    'X-RapidAPI-Host': process.env.BOOKING_API_HOST
                }
            };

            const response = await axios.request(options);
            // Extract token from response
            return response.data.data.flightOffers[0].token;
        } catch (error) {
            console.error('Error fetching flight token:', error.message);
            throw new Error('Failed to fetch flight token');
        }
    }

    /**
     * Fetch and save flight details
     * @param {String} token - Flight token
     * @returns {Promise} Saved flight data
     */
    static async fetchAndSaveFlightDetails(token, location) {
        try {
            const options = {
                method: 'GET',
                url: `https://${process.env.BOOKING_API_HOST}/api/v1/flights/getFlightDetails`,
                params: { token: token },
                headers: {
                    'X-RapidAPI-Key': process.env.BOOKING_API_KEY,
                    'X-RapidAPI-Host': process.env.BOOKING_API_HOST
                }
            };

            const response = await axios.request(options);
            const flightData = response.data.data;

            // Transform API response to match our database schema
            const flightRecord = {
                flight_name: flightData.segments[0].legs[0].carriersData[0].name,
                arrival_airport: flightData.segments[0].arrivalAirport.name,
                departure_airport: flightData.segments[0].departureAirport.name,
                arrival_time: flightData.segments[0].arrivalTime,
                departure_time: flightData.segments[0].departureTime,
                flight_logo: flightData.segments[0].legs[0].carriersData[0].logo,
                fare: flightData.priceBreakdown.total.units,
                location: location,
            };

            console.log('Flight Record:', flightRecord);

            // // Save to database
            const savedFlight = await Flight.create(flightRecord);
            return savedFlight;
        } catch (error) {
            console.error('Error fetching flight details:', error.message);
            throw new Error('Failed to fetch and save flight details');
        }
    }

    /**
     * Complete flight retrieval process
     * @param {String} location - Search location
     * @returns {Promise} List of saved flights
     */
    static async retrieveFlights(fromLocation, toLocation) {
        try {
            // earch for airport ID
            const fromId = await this.searchAirportId(fromLocation);
            const toId = await this.searchAirportId(toLocation);
            // Fetch flight token
            const token = await this.fetchFlightToken(fromId, toId);

            // Fetch and save flight details
            const flight = await this.fetchAndSaveFlightDetails(token, fromLocation);

            return [flight];
        } catch (error) {
            console.error('Error in flight retrieval:', error.message);
            throw error;
        }
    }
}

module.exports = FlightService