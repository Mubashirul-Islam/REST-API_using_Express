const pool = require('../config/database');

class Flight {
    /**
     * Save flight data to database
     * @param {Object} flightData - Flight information
     * @returns {Promise} Saved flight record
     */
    static async create(flightData) {
        const {
            flight_name,
            arrival_airport,
            departure_airport,
            arrival_time,
            departure_time,
            flight_logo,
            fare,
            location,
        } = flightData;

        const query = `
      INSERT INTO flights (
        flight_name, arrival_airport, departure_airport, 
        arrival_time, departure_time, flight_logo, fare, 
        location
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

        const values = [
            flight_name, arrival_airport, departure_airport,
            arrival_time, departure_time, flight_logo, fare,
            location
        ];

        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error creating flight: ${error.message}`);
        }
    }

    /**
     * Find flights by location
     * @param {String} location - Search location
     * @returns {Promise} List of flights
     */
    static async findByLocation(location) {
        const query = `
      SELECT * FROM flights 
      WHERE LOWER(location) = LOWER($1) 
    `;

        try {
            const result = await pool.query(query, [location]);
            return result.rows;
        } catch (error) {
            throw new Error(`Error finding flights: ${error.message}`);
        }
    }

    /**
     * find flight by ID
     * @param {Number} id - Flight ID
     * @returns {Promise} All flights
     */
    static async findById(id) {
        const query = 'SELECT * FROM flights WHERE id = $1';

        try {
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error fetching flights by Id: ${error.message}`);
        }
    }
}

module.exports = Flight;