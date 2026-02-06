const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const testAddProduct = async () => {
    try {
        // 1. Login
        console.log('Logging in...');
        const loginRes = await axios.post(`${API_URL}/admin/login`, {
            username: 'admin@example.com',
            password: 'admin123'
        });
        const token = loginRes.data.token;
        console.log('Login successful. Token:', token.substring(0, 20) + '...');

        // 2. Add Product
        console.log('Adding product...');
        // We need FormData for file upload, or just regular fields if image is URL.
        // The backend expects 'image' file if upload middleware is used.
        // But the controller might handle URL if provided.
        // Let's check if the route REQUIRES a file. 
        // route: upload.single('image') -> this usually proceeds even if no file, unless middleware throws.

        // Let's try sending JSON first, simulating the "Image URL" mode.
        // AdminProducts.jsx sends FormData even for URL mode.

        const form = new FormData(); // node-fetch/axios might need 'form-data' package
        // simpler: assume backend handles JSON if upload middleware allows it? 
        // upload.single('image') checks for multipart/form-data.
        // We should use 'axios' with 'form-data' package or just simple JSON if supported.
        // Given I am in a script, I might not have 'form-data' installed in backend.
        // Let's check backend/package.json.

        // Actually, let's just use `fetch` if node version supports it, or `axios` if installed.
        // The backend `productController.createProduct` likely extracts body fields.

        // Let's try to just hit the endpoint with the token.
        const productData = {
            name: "Test Product",
            category: "doors",
            price: 1000,
            description: "Test Desc",
            image: "http://example.com/img.jpg",
            featured: false
        };

        try {
            const res = await axios.post(`${API_URL}/products`, productData, {
                headers: {
                    Authorization: `Bearer ${token}`
                    // 'Content-Type': 'application/json' (default for object)
                }
            });
            console.log('Product added successfully:', res.data);
        } catch (err) {
            // If it fails because of content-type (because of upload middleware expected multipart), 
            // we will see 400 or 500, not 401. 
            // If we see 401, then Auth is broken.
            console.log('Add Product Failed. Status:', err.response?.status);
            console.log('Message:', err.response?.data);
        }

    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Response:', error.response.data);
        }
    }
};

testAddProduct();
