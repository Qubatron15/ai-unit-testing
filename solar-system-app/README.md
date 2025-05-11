# Solar System App

## Overview
A simple Angular v18 application demonstrating the `SolarSystemPlanetsHelper` class.

## Features
- Get planet names by index
- Check if a planet is in the solar system
- Calculate total probes cost (with mock data)

## Running the Project
1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

3. Open `http://localhost:4200` in your browser

## Key Components
- `SolarSystemPlanetsHelper`: Utility class for solar system planet operations
- `SolarSystemComponent`: Demonstrates helper class functionality
- `MockSolarSystemDetails`: Mock implementation for demonstration purposes

## Implemented Methods
- `getPlanetName(planetNumber)`: Returns planet name by index
- `isSolarSystemPlanet(planetName)`: Checks if a planet is in the solar system
- `getSolarSystemProbesCost()`: Calculates total probes cost
