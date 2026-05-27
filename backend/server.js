const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Practice';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✓ Connected to MongoDB');
    console.log(`Database: Practice`);
})
.catch((error) => {
    console.error('✗ MongoDB connection error:', error.message);
    process.exit(1);
});

// Restaurant Schema - Matches existing MongoDB structure
const restaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    address_line_2: String,
    outcode: String,
    postcode: String,
    rating: Number,
    type_of_food: String,
    URL: String
}, { collection: 'Restaurants', strict: false });

// Create Model
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// ==================== Routes ====================

/**
 * GET /api/restaurants - Get all restaurants
 */
app.get('/api/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find().limit(100);
        res.status(200).json({
            success: true,
            count: restaurants.length,
            data: restaurants
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * GET /api/restaurants/cuisine/:cuisine - Get restaurants by type_of_food
 */
app.get('/api/restaurants/cuisine/:cuisine', async (req, res) => {
    try {
        const { cuisine } = req.params;
        
        // Case-insensitive search for type_of_food
        const restaurants = await Restaurant.find({
            type_of_food: { $regex: cuisine, $options: 'i' }
        }).limit(100);
        
        res.status(200).json({
            success: true,
            count: restaurants.length,
            data: restaurants
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.get('/api/restaurants/chinese', async (req, res) => {
    try {
        const chineseRestaurants = await Restaurant.find({
            type_of_food: { $regex: 'Chinese', $options: 'i' }
        }).limit(100);
        
        res.status(200).json({
            success: true,
            count: chineseRestaurants.length,
            data: chineseRestaurants
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


app.get('/api/restaurants/id/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid restaurant ID'
            });
        }
        
        const restaurant = await Restaurant.findById(id);
        
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: restaurant
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * POST /api/restaurants - Create a new restaurant
 */
app.post('/api/restaurants', async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        const savedRestaurant = await restaurant.save();
        
        res.status(201).json({
            success: true,
            message: 'Restaurant created successfully',
            data: savedRestaurant
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * PUT /api/restaurants/id/:id - Update restaurant
 */
app.put('/api/restaurants/id/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid restaurant ID'
            });
        }
        
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedRestaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Restaurant updated successfully',
            data: updatedRestaurant
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * DELETE /api/restaurants/id/:id - Delete restaurant
 */
app.delete('/api/restaurants/id/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid restaurant ID'
            });
        }
        
        const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
        
        if (!deletedRestaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Restaurant deleted successfully',
            data: deletedRestaurant
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * GET /api/cuisines - Get all available food types
 */
app.get('/api/cuisines', async (req, res) => {
    try {
        const foodTypes = await Restaurant.distinct('type_of_food');
        res.status(200).json({
            success: true,
            data: foodTypes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date()
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n✓ Server is running on http://localhost:${PORT}`);
    console.log(`✓ API endpoints:`);
    console.log(`  - GET  /api/restaurants - Get all restaurants`);
    console.log(`  - GET  /api/restaurants/chinese - Get Chinese restaurants`);
    console.log(`  - GET  /api/restaurants/cuisine/:cuisine - Get by cuisine`);
    console.log(`  - GET  /api/cuisines - Get all cuisines`);
    console.log(`  - POST /api/restaurants - Create restaurant`);
    console.log(`  - PUT  /api/restaurants/id/:id - Update restaurant`);
    console.log(`  - DELETE /api/restaurants/id/:id - Delete restaurant\n`);
});

module.exports = app;
