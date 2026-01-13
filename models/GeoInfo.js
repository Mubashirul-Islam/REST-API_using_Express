const pool = require('../config/database');

class GeoInfo {
    /**
     * Save geographic information
     * @param {Object} geoData - Geographic data
     * @returns {Promise} Saved geo record
     */
    static async create(geoData) {
        const {
            location,
            country_code,
            latitude,
            longitude,
        } = geoData;

        const query = `
      INSERT INTO geo_info (
        location, country_code, 
        latitude, longitude
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

        const values = [
            location, country_code,
            latitude, longitude
        ];

        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error creating geo info: ${error.message}`);
        }
    }

    /**
     * Find geographic info by location name
     * @param {String} location - Location name
     * @returns {Promise} Geographic information
     */
    static async findByLocation(location) {
        const query = `
      SELECT * FROM geo_info 
      WHERE LOWER(location) = LOWER($1)
    `;

        try {
            const result = await pool.query(query, [location]);
            return result.rows;
        } catch (error) {
            throw new Error(`Error finding geo info: ${error.message}`);
        }
    }
}

module.exports = GeoInfo;