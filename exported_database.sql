--
-- PostgreSQL database dump
--

\restrict 9NeWJkgfRPWLV3QJ6rYMv3q2giSHvNnwlTD45C8yZPMW0dzaJDyM8TAHhzjGqaM

-- Dumped from database version 15.15
-- Dumped by pg_dump version 15.15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: attractions; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.attractions (
    id integer NOT NULL,
    attraction_name character varying(255),
    attraction_slug character varying(255) NOT NULL,
    additional_info text,
    cancellation_policy boolean,
    images text,
    price numeric(10,2),
    whats_included text[],
    country character varying(255),
    city character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.attractions OWNER TO admin;

--
-- Name: attractions_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.attractions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.attractions_id_seq OWNER TO admin;

--
-- Name: attractions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.attractions_id_seq OWNED BY public.attractions.id;


--
-- Name: flights; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.flights (
    id integer NOT NULL,
    flight_name character varying(255),
    arrival_airport character varying(255),
    departure_airport character varying(255),
    arrival_time timestamp without time zone,
    departure_time timestamp without time zone,
    flight_logo character varying(500),
    fare numeric(10,2),
    location character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.flights OWNER TO admin;

--
-- Name: flights_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.flights_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.flights_id_seq OWNER TO admin;

--
-- Name: flights_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.flights_id_seq OWNED BY public.flights.id;


--
-- Name: geo_info; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.geo_info (
    id integer NOT NULL,
    location character varying(255) NOT NULL,
    country_code character varying(10),
    latitude numeric(10,8),
    longitude numeric(10,8),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.geo_info OWNER TO admin;

--
-- Name: geo_info_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.geo_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.geo_info_id_seq OWNER TO admin;

--
-- Name: geo_info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.geo_info_id_seq OWNED BY public.geo_info.id;


--
-- Name: attractions id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.attractions ALTER COLUMN id SET DEFAULT nextval('public.attractions_id_seq'::regclass);


--
-- Name: flights id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.flights ALTER COLUMN id SET DEFAULT nextval('public.flights_id_seq'::regclass);


--
-- Name: geo_info id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.geo_info ALTER COLUMN id SET DEFAULT nextval('public.geo_info_id_seq'::regclass);


--
-- Data for Name: attractions; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.attractions (id, attraction_name, attraction_slug, additional_info, cancellation_policy, images, price, whats_included, country, city, created_at) FROM stdin;
1	Private Transfer Barcelona city to BarcelonaAirport Departure	prsotabw5xym-departure-barcelona-airport-private-transfer	Infants and small children can ride in a pram or stroller\n\nPublic transportation options are available nearby\n\nSpecialized infant seats are available\n\nSuitable for all physical fitness levels\n\n\n\nwe pick anywear any time from Barcelona city center HOTEL, APARTMENTS HOSTEL, etc\n\nNot wheelchair accessible\n\nPlease bring your ticket with you to the attraction.\n\nBe aware that operators may cancel for unforeseen reasons.\n\nYou need to be 18 years or older to book.	t	https://q-xx.bstatic.com/xdata/images/xphoto/300x320/413007841.jpg?k=a303a809a2179d9abde538a9cfa51cf1f58ee3987332136e42e02eb02349a993&o=	70.09	{"Private transportation","WiFi on board","Air-conditioned vehicle"}	es	barcelona	2026-01-13 11:13:30.330849
2	Authentic London Sunday Markets with a Londoner	prcpjdq2jhjp-authentic-london-sunday-markets-walking-tour	Infants and small children can ride in a pram or stroller\n\nService animals allowed\n\nPublic transportation options are available nearby\n\nSuitable for all physical fitness levels\n\nI allow a 15-20 mins free time in each market so you are able to have time to discover the hidden gems. Each market is a 10-15 min walk which I fill with some great factual information about the area.\n\nNot wheelchair accessible\n\nPlease bring your ticket with you to the attraction.\n\nBe aware that operators may cancel for unforeseen reasons.\n\nYou need to be 18 years or older to book. Children must be accompanied by an adult.	t	https://q-xx.bstatic.com/xdata/images/xphoto/300x320/372768247.jpg?k=4dcc9817d1deb8710458fbd30f99e0eaef6f43df2cc305076284416f8f932431&o=	33.29	{"Guided Walking Tour"}	gb	london	2026-01-13 11:13:32.417687
3	Madrid City Tour	praq2pyg8ukv-madrid-city-tour	The ticket is valid for both routes for 24 hours after redemption, any day of the week. Only one trip per route is allowed.\n\nSchedule: Route 1 operates from 09.30 to 20.00 // Route 2 operates from 09.30 to 20.30 // Night Route: 21:00h\n\nDuration: Route 1 90 minutes // Route 2 80 minutes – approximately // Night Route 1.15h approximately.\n\nDeparture and Arrival: Route 1 and Night Route: Felipe IV // Route 2: Plaza Neptuno.\n\nThe guided walking tour of Madrid is offered in either English or Spanish. You can check information or reserve your spot using the QR codes available onboard the bus.\n\nPlease note that the itinerary may be altered due to events or celebrations in the city (cultural events, sports events, official acts, or construction works)\n\nPlease bring your ticket with you to the attraction.\n\nBe aware that operators may cancel for unforeseen reasons.\n\nYou need to be 18 years or older to book. Children must be accompanied by an adult.	t	https://q-xx.bstatic.com/xdata/images/xphoto/300x320/517919388.jpg?k=1f5d27e1aeaa187515f64020b1193c46b0f740eae7f176b5d36fce2c10dce03d&o=	32.60	{"Sightseeing bus tour with 2 panoramic routes: Historical and Modern (if panoramic tour option is selected)","Night Tour of Historic Madrid (if Night Route option is selected)","2-hour guided walking tour (based on tips at the client's expense and discretion).","Free drink at Tablao Flamenco La Quimera. Check conditions on board.","Audio guide in 14 languages",Headphones,"Open-top, air-conditioned double-decker buses with sliding roofs"}	es	madrid	2026-01-13 11:13:35.39434
\.


--
-- Data for Name: flights; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.flights (id, flight_name, arrival_airport, departure_airport, arrival_time, departure_time, flight_logo, fare, location, created_at) FROM stdin;
1	Malaysia Airlines	Sydney Kingsford Smith Airport	Barcelona El Prat Airport	2026-01-15 09:15:00	2026-01-13 22:15:00	https://r-xx.bstatic.com/data/airlines_logo/MH.png	6873.00	barcelona	2026-01-13 11:17:06.404791
2	Air Europa	Adolfo Suarez Madrid-Barajas Airport	London Gatwick Airport	2026-01-13 20:55:00	2026-01-13 17:25:00	https://r-xx.bstatic.com/data/airlines_logo/UX.png	59.00	london	2026-01-13 11:17:16.138533
3	British Airways	London Heathrow Airport	Adolfo Suarez Madrid-Barajas Airport	2026-01-13 18:50:00	2026-01-13 17:20:00	https://r-xx.bstatic.com/data/airlines_logo/BA.png	100.00	madrid	2026-01-13 11:17:36.107973
\.


--
-- Data for Name: geo_info; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.geo_info (id, location, country_code, latitude, longitude, created_at) FROM stdin;
1	barcelona	es	41.29834050	2.08000950	2026-01-13 11:13:30.340914
2	london	gb	51.51965690	-0.07554690	2026-01-13 11:13:32.424824
3	madrid	es	40.41522200	-3.69466470	2026-01-13 11:13:35.40407
\.


--
-- Name: attractions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.attractions_id_seq', 4, true);


--
-- Name: flights_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.flights_id_seq', 3, true);


--
-- Name: geo_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.geo_info_id_seq', 3, true);


--
-- Name: attractions attractions_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.attractions
    ADD CONSTRAINT attractions_pkey PRIMARY KEY (id);


--
-- Name: flights flights_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT flights_pkey PRIMARY KEY (id);


--
-- Name: geo_info geo_info_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.geo_info
    ADD CONSTRAINT geo_info_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict 9NeWJkgfRPWLV3QJ6rYMv3q2giSHvNnwlTD45C8yZPMW0dzaJDyM8TAHhzjGqaM

