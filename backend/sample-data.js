/**
 * Sample Data - Insert Chinese Restaurants into MongoDB
 * 
 * This file contains sample data to insert into the Restaurants collection.
 * Use this to populate your database with test data.
 */

const sampleRestaurants = [
  {
    name: "Dragon Palace",
    cuisine: "Chinese",
    rating: 4.8,
    address: "123 Main Street, Downtown",
    phone: "(555) 123-4567",
    email: "info@dragonpalace.com",
    website: "https://www.dragonpalace.com",
    description: "Authentic Sichuan cuisine with traditional recipes passed down for generations. Specializing in spicy dishes and hand-pulled noodles.",
    priceRange: "$$",
    image: "https://via.placeholder.com/400x300?text=Dragon+Palace"
  },
  {
    name: "Great Wall Restaurant",
    cuisine: "Chinese",
    rating: 4.5,
    address: "456 Oak Avenue, Midtown",
    phone: "(555) 234-5678",
    email: "contact@greatwall.com",
    website: "https://www.greatwallrestaurant.com",
    description: "Traditional Cantonese cooking with fresh seafood. Famous for dim sum brunches and roasted meats.",
    priceRange: "$$",
    image: "https://via.placeholder.com/400x300?text=Great+Wall"
  },
  {
    name: "Jade Garden",
    cuisine: "Chinese",
    rating: 4.6,
    address: "789 Elm Street, Uptown",
    phone: "(555) 345-6789",
    email: "reservations@jadegarden.com",
    website: "https://www.jadegarden.com",
    description: "Elegant fine dining with modern takes on classic Chinese dishes. Award-winning chef with 20 years experience.",
    priceRange: "$$$",
    image: "https://via.placeholder.com/400x300?text=Jade+Garden"
  },
  {
    name: "Golden Dragon",
    cuisine: "Chinese",
    rating: 4.3,
    address: "321 Pine Road, East Side",
    phone: "(555) 456-7890",
    email: "info@goldendragon.net",
    website: "https://www.goldendragon.net",
    description: "Family-owned restaurant serving Hunan-style cuisine. Known for hot and spicy flavors and comfort food classics.",
    priceRange: "$",
    image: "https://via.placeholder.com/400x300?text=Golden+Dragon"
  },
  {
    name: "Lantern Chinese Kitchen",
    cuisine: "Chinese",
    rating: 4.7,
    address: "654 Maple Lane, West End",
    phone: "(555) 567-8901",
    email: "hello@lanternkitchen.com",
    website: "https://www.lanternkitchen.com",
    description: "Modern Asian fusion with traditional roots. Contemporary atmosphere perfect for date nights and celebrations.",
    priceRange: "$$",
    image: "https://via.placeholder.com/400x300?text=Lantern+Kitchen"
  },
  {
    name: "Red Pavilion",
    cuisine: "Chinese",
    rating: 4.4,
    address: "987 Cedar Boulevard, North District",
    phone: "(555) 678-9012",
    email: "service@redpavilion.com",
    website: "https://www.redpavilion.com",
    description: "Cozy neighborhood spot with Shanghai noodles and handmade dumplings. Perfect for families and casual dining.",
    priceRange: "$",
    image: "https://via.placeholder.com/400x300?text=Red+Pavilion"
  },
  {
    name: "Phoenix Court",
    cuisine: "Chinese",
    rating: 4.9,
    address: "111 Walnut Street, Downtown East",
    phone: "(555) 789-0123",
    email: "bookings@phoenixcourt.com",
    website: "https://www.phoenixcourt.com",
    description: "Premium Peking duck specialists. Refined ambiance with impeccable service and extensive wine selection.",
    priceRange: "$$$",
    image: "https://via.placeholder.com/400x300?text=Phoenix+Court"
  },
  {
    name: "Silk Road",
    cuisine: "Chinese",
    rating: 4.2,
    address: "222 Birch Street, South Loop",
    phone: "(555) 890-1234",
    email: "info@silkroad.org",
    website: "https://www.silkroad.org",
    description: "Traditional Chinese regional flavors from different provinces. Educational menu with dish descriptions and origins.",
    priceRange: "$$",
    image: "https://via.placeholder.com/400x300?text=Silk+Road"
  }
];

console.log("Use this command in MongoDB to insert sample data:\n");
console.log("db.Restaurants.insertMany([");
sampleRestaurants.forEach((restaurant, index) => {
  console.log(JSON.stringify(restaurant, null, 2).replace(/\n/g, '\n  ') + (index < sampleRestaurants.length - 1 ? ',' : ''));
});
console.log("]);\n");

console.log("\n=== For Node.js with Mongoose ===\n");
console.log("module.exports = " + JSON.stringify(sampleRestaurants, null, 2) + ";");
