# Restaurant API - Backend

Express.js backend server for the Restaurant application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update `.env` file with your MongoDB URI:
```
MONGODB_URI=mongodb://localhost:27017/Practice
PORT=5000
```

3. Run the server:
```bash
npm start          # Production mode
npm run dev        # Development mode with auto-reload
```

## API Endpoints

### Get All Restaurants
```
GET /api/restaurants
```

### Get Chinese Restaurants
```
GET /api/restaurants/chinese
```

### Get Restaurants by Cuisine
```
GET /api/restaurants/cuisine/:cuisine
Example: /api/restaurants/cuisine/Italian
```

### Get Restaurant by ID
```
GET /api/restaurants/id/:id
```

### Get All Available Cuisines
```
GET /api/cuisines
```

### Create Restaurant
```
POST /api/restaurants
Body: {
  "name": "Restaurant Name",
  "cuisine": "Chinese",
  "rating": 4.5,
  "address": "123 Main St",
  "phone": "555-1234",
  "description": "..."
}
```

### Update Restaurant
```
PUT /api/restaurants/id/:id
Body: { fields to update }
```

### Delete Restaurant
```
DELETE /api/restaurants/id/:id
```

## Database

- **Database**: Practice
- **Collection**: Restaurants
- **Connection**: MongoDB (localhost:27017)

## Server Status

- **Port**: 5000
- **Health Check**: GET /api/health
