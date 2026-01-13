const pool = require('../config/database');

class Attraction {
    /**
     * Save attraction data to database
     * @param {Object} attractionData - Attraction information
     * @returns {Promise} Saved attraction record
     */
    static async create(attractionData) {
        const {
            attraction_name,
            attraction_slug,
            additional_info,
            cancellation_policy,
            images,
            price,
            whats_included,
            country,
            city
        } = attractionData;

        const query = `
      INSERT INTO attractions (
        attraction_name, attraction_slug, additional_info, 
        cancellation_policy, images, price, whats_included, 
        country, city
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

        const values = [
            attraction_name, attraction_slug, additional_info,
            cancellation_policy, images, price, whats_included,
            country, city
        ];

        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error creating attraction: ${error.message}`);
        }
    }

    /**
     * Find attractions by city or country
     * @param {String} location - Search location (city or country)
     * @returns {Promise} List of attractions
     */
    static async findByLocation(location) {
        const query = `
      SELECT * FROM attractions 
      WHERE LOWER(city) = LOWER($1)
    `;

        try {
            const result = await pool.query(query, [location]);
            return result.rows;
        } catch (error) {
            throw new Error(`Error finding attractions: ${error.message}`);
        }
    }

    /**
     * find attraction by ID
     * @param {Number} id - Attraction ID
     * @returns {Promise} All attractions
     */
    static async findById(id) {
        const query = `
        SELECT * FROM attractions
        WHERE id = $1
    `;

        try {
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error fetching attractions by Id: ${error.message}`);
        }
    }
}

module.exports = Attraction;