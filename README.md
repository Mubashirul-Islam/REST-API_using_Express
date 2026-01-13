# Travel Guide REST API

A REST API for searching flights and attractions using Express.js and PostgreSQL.

## Prerequisites

- Node.js (v14 or higher)
- Docker & Docker Compose

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start PostgreSQL database:
```bash
docker-compose up -d
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
DB_USER=admin
DB_PASSWORD=admin123
DB_HOST=localhost
DB_PORT=5432
DB_NAME=travel_guide
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Health Check
```
GET /health
```

### Search by Location
```
GET /search/:locationname
```
Returns flights and attractions for a location.

**Valid locations:** `barcelona`, `london`, `madrid`

### Get Details
```
GET /details/:id?searchtype=flight|attraction
```
Returns detailed information for a specific flight or attraction.

**Valid IDs:** `1`, `2`, `3`

## Project Structure

```
rest-api_using_express/
├── config/
│   └── database.js
├── controllers/
│   ├── detailsController.js
│   └── searchController.js
├── middleware/
│   ├── errorHandler.js
│   └── validator.js
├── models/
│   ├── Attraction.js
│   ├── Flight.js
│   └── GeoInfo.js
├── routes/
│   └── index.js
├── services/
│   ├── attractionService.js
│   └── flightService.js
├── data_retrival.js
├── docker-compose.yml
├── init.sql
├── package.json
└── server.js
```

## Tech Stack

- Express.js
- PostgreSQL
- Docker
