const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const products = [
    // Doors
    {
        name: "Traditional Carved Door",
        description: "Elegant wooden door with intricate traditional patterns",
        price: 450,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
        featured: true,
        category: 'doors'
    },
    {
        name: "Modern Minimalist Door",
        description: "Clean lines and contemporary design for modern homes",
        price: 380,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80",
        featured: false,
        category: 'doors'
    },
    {
        name: "Rustic Barn Door",
        description: "Weathered wood finish with metal hardware accents",
        price: 520,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        featured: false,
        category: 'doors'
    },
    {
        name: "Classic Panel Door",
        description: "Six-panel wooden door with traditional craftsmanship",
        price: 420,
        image: "https://images.unsplash.com/photo-1565183928294-7063f23ce0e7?auto=format&fit=crop&w=400&q=80",
        featured: false,
        category: 'doors'
    },
    {
        name: "Arched Cathedral Door",
        description: "Gothic-inspired arched door with detailed woodwork",
        price: 680,
        image: "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?auto=format&fit=crop&w=400&q=80",
        featured: true,
        category: 'doors'
    },
    {
        name: "Double Entry Door Set",
        description: "Matching pair of entrance doors with glass panels",
        price: 950,
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=400&q=80",
        featured: false,
        category: 'doors'
    },
    // Furniture
    {
        name: "Handcrafted Dining Table",
        description: "Solid wood dining table with elegant carved legs",
        price: 890,
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
        featured: true,
        category: 'furniture'
    },
    {
        name: "Vintage Wooden Chair",
        description: "Classic design chair with comfortable seating",
        price: 240,
        image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80",
        featured: false,
        category: 'furniture'
    },
    {
        name: "Rustic Coffee Table",
        description: "Live-edge wooden coffee table with natural beauty",
        price: 560,
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=400&q=80",
        featured: false,
        category: 'furniture'
    },
    // Sculptures
    {
        name: "Animal Figurine Collection",
        description: "Hand-carved wooden animal sculptures",
        price: 150,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
        featured: true,
        category: 'sculptures'
    },
    // Panels
    {
        name: "Ornate Wall Panel",
        description: "Decorative wall panel with intricate carvings",
        price: 680,
        image: "https://images.unsplash.com/photo-1465101178521-c1a4c8a0a0b2?auto=format&fit=crop&w=400&q=80",
        featured: true,
        category: 'panels'
    },
    {
        name: "Room Divider Screen",
        description: "Multi-panel room divider with geometric patterns",
        price: 750,
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        featured: false,
        category: 'panels'
    }
];

const importData = async () => {
    try {
        await Product.deleteMany(); // Clear existing products
        await Product.insertMany(products);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
