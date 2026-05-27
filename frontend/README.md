# Restaurant Finder - Frontend

React frontend application for displaying restaurant data with Chinese cuisine filter.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Features

✅ Fetch restaurant data from Express backend  
✅ Display Chinese restaurants with filter  
✅ Responsive design  
✅ Error handling  
✅ Loading states  
✅ Restaurant details (rating, address, phone, email, website, price)  

## Prerequisites

Make sure the backend server is running:
```bash
cd ../backend
npm install
npm start
```

Backend will be available at `http://localhost:5000`

## Components

- **RestaurantList** - Main component that fetches and displays restaurants
- **RestaurantCard** - Individual restaurant card component
- **App** - Root application component

## API Integration

The frontend connects to the backend API endpoints:
- `GET /api/restaurants/chinese` - Fetch Chinese restaurants
- `GET /api/restaurants` - Fetch all restaurants

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.
