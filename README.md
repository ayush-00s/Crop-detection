# RoboCrop - Smart Agriculture Monitoring System

## Overview

RoboCrop is an innovative agricultural monitoring system that combines robotics, IoT sensors, and a user-friendly web interface to help farmers monitor and manage their fields efficiently. The system uses autonomous rovers and environmental sensors to collect real-time data about field conditions, crop health, and potential weed infestations.

## Features

### 1. Field Monitoring Dashboard

- Real-time environmental data monitoring
- Interactive field map with rover location tracking
- Soil condition monitoring (moisture, temperature, humidity)
- Air condition monitoring (temperature, humidity, wind speed)
- Rover status tracking (battery, coverage, operational status)

### 2. User Authentication

- Secure Google Sign-in integration
- Email-based authentication
- Protected routes and authenticated access

### 3. Smart Rover Integration

- Autonomous field navigation
- Real-time status updates
- Coverage tracking
- Battery monitoring
- Weed detection capabilities

### 4. Environmental Monitoring

- Soil Conditions:
  - Moisture levels
  - Soil temperature
  - Soil humidity
- Air Conditions:
  - Air temperature
  - Humidity levels
  - Wind speed
- Weather updates for the field location

### 5. Marketplace

- Agricultural supplies and equipment
- Direct access to farming resources
- Product browsing and selling capabilities

## Technology Stack

### Frontend

- React.js with Vite
- TailwindCSS for styling
- Leaflet for interactive maps
- Zustand for state management
- React Router for navigation

### Backend

- Node.js/Express.js
- MongoDB for data storage
- Google OAuth for authentication
- RESTful API architecture

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/RoboCrop.git
cd RoboCrop
```

2. Install dependencies:

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. Set up environment variables:

```bash
# Frontend (.env)
VITE_API_URL=your_api_url
VITE_GOOGLE_CLIENT_ID=your_google_client_id

# Backend (.env)
MONGODB_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
```

4. Run the development servers:

```bash
# Frontend
npm run dev

# Backend
npm run dev
```


