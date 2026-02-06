// const fetch = require('node-fetch'); // v3 is ESM only

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const BASE_URL = 'http://localhost:5000/api/auth';

async function testAuth() {
    try {
        // 1. Register
        console.log('--- Registering User ---');
        const registerRes = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email: `test${Date.now()}@example.com`,
                password: 'password123'
            })
        });
        const registerData = await registerRes.json();
        console.log('Register Status:', registerRes.status);
        console.log('Register Data:', registerData);

        if (!registerData.token) throw new Error('Registration failed, no token');

        const token = registerData.token;

        // 2. Access Protected Route (Me)
        console.log('\n--- Accessing Protected Route ---');
        const meRes = await fetch(`${BASE_URL}/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const meData = await meRes.json();
        console.log('Me Status:', meRes.status);
        console.log('Me Data:', meData);

    } catch (error) {
        console.error('Error:', error);
    }
}

testAuth();
