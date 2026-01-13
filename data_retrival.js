const FlightService = require('./services/flightService');
const AttractionService = require('./services/attractionService');

//Initial data fetch
class DataInitializer {
    static async initializeData() {
        try {
            const locations = ['barcelona', 'london', 'madrid'];
            let j = locations.length - 1;
            console.log('Fetching flights...');
            for (let i = 0; i < locations.length; i++) {
                console.log(`Retrieving flight for ${locations[i]} to ${locations[j]}`);
                const flights = await FlightService.retrieveFlights(locations[i], locations[j]);
                console.log(`✅ Retrieved flight for ${locations[i]} to ${locations[j]}`);
                j--;
            }

            console.log('Fetching attractions...');
            for (const location of locations) {
                console.log(`Retrieving attractions for ${location}`);
                const attractions = await AttractionService.retrieveAttractions(location);
                console.log(`✅ Retrieved attractions for ${location}`);
            }

            console.log('Data initialization completed\n');
        } catch (error) {
            console.error('❌ Error during data initialization:', error.message);
            console.error('Server will continue running, but initial data may be incomplete\n');
        }
    }
}

module.exports = DataInitializer;