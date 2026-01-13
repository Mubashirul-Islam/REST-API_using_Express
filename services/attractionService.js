const axios = require('axios');
const Attraction = require('../models/Attraction');
const GeoInfo = require('../models/GeoInfo');

class AttractionService {
  /**
   * Search location and retrieve slug
   * @param {String} location - Location name
   * @returns {Promise} Attraction slug
   */
  static async searchLocationSlugs(location) {
    try {
      const options = {
        method: 'GET',
        url: `https://${process.env.BOOKING_API_HOST}/api/v1/attraction/searchLocation`,
        params: { query: location },
        headers: {
          'X-RapidAPI-Key': process.env.BOOKING_API_KEY,
          'X-RapidAPI-Host': process.env.BOOKING_API_HOST
        }
      };

      const response = await axios.request(options);

      // Extract slug list from response
      return response.data.data.products[0].productSlug;
    } catch (error) {
      console.error('Error searching location slugs:', error.message);
      throw new Error('Failed to search location slugs');
    }
  }

  /**
   * Fetch and save attraction details by slug
   * @param {String} slug - Attraction slug
   * @returns {Promise} Saved attraction
   */
  static async fetchAndSaveAttractionDetails(slug, location) {
    try {
      const options = {
        method: 'GET',
        url: `https://${process.env.BOOKING_API_HOST}/api/v1/attraction/getAttractionDetails`,
        params: { slug: slug },
        headers: {
          'X-RapidAPI-Key': process.env.BOOKING_API_KEY,
          'X-RapidAPI-Host': process.env.BOOKING_API_HOST
        }
      };

      const response = await axios.request(options);
      const attractionData = response.data.data;

      // Transform API response to match database schema
      const attractionRecord = {
        attraction_name: attractionData.name,
        attraction_slug: slug,
        additional_info: attractionData.additionalInfo,
        cancellation_policy: attractionData.cancellationPolicy.hasFreeCancellation,
        images: attractionData.primaryPhoto.small,
        price: attractionData.representativePrice.chargeAmount,
        whats_included: attractionData.whatsIncluded,
        country: attractionData.addresses.arrival[0].country,
        city: location
      };

      // Save to database
      const savedAttraction = await Attraction.create(attractionRecord);

      // Save additional GeoInfo
      const savedGeoInfo = await GeoInfo.create({
        location: location,
        country_code: attractionData.addresses.arrival[0].country,
        latitude: attractionData.addresses.arrival[0].latitude,
        longitude: attractionData.addresses.arrival[0].longitude
      });

      return savedAttraction;
    } catch (error) {
      console.error('Error fetching attraction details:', error.message);
      throw new Error('Failed to fetch and save attraction details');
    }
  }

  /**
   * Complete attraction retrieval process
   * @param {String} location - Search location
   * @returns {Promise} List of saved attractions
   */
  static async retrieveAttractions(location) {
    try {
      // Search for location slugs
      const slug = await this.searchLocationSlugs(location);

      // Fetch and save details for each slug
      const attraction = await this.fetchAndSaveAttractionDetails(slug, location);

      return [attraction];
    } catch (error) {
      console.error('Error in attraction retrieval:', error.message);
      throw error;
    }
  }
}

module.exports = AttractionService;