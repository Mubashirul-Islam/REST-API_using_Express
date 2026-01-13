CREATE TABLE IF NOT EXISTS flights (
    id SERIAL PRIMARY KEY,
    flight_name VARCHAR(255),
    arrival_airport VARCHAR(255),
    departure_airport VARCHAR(255),
    arrival_time TIMESTAMP,
    departure_time TIMESTAMP,
    flight_logo VARCHAR(500),
    fare DECIMAL(10, 2),
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create attractions table
CREATE TABLE IF NOT EXISTS attractions (
    id SERIAL PRIMARY KEY,
    attraction_name VARCHAR(255),
    attraction_slug VARCHAR(255) NOT NULL,
    additional_info TEXT,
    cancellation_policy BOOLEAN,
    images TEXT,
    price DECIMAL(10, 2),
    whats_included TEXT[],
    country VARCHAR(255),
    city VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create geo_info table (for location information)
CREATE TABLE IF NOT EXISTS geo_info (
    id SERIAL PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    country_code VARCHAR(10),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(10, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);