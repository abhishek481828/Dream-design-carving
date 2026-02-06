const API_URL = 'http://localhost:5000/api';

async function test() {
    try {
        console.log('1. Logging in...');
        const loginRes = await fetch(`${API_URL}/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'abhishek481828@gmail.com', // Using email as username per adminRoutes logic
                password: 'avhi@2004'
            })
        });

        if (!loginRes.ok) {
            console.error('Login Failed:', loginRes.status, await loginRes.text());
            return;
        }

        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log('Login successful. Token acquired.');

        console.log('2. Adding product...');
        const productData = {
            name: "Repro Product",
            category: "doors",
            price: 500,
            description: "Repro Desc",
            image: "http://example.com/img.jpg",
            featured: false
        };

        const addRes = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });

        if (addRes.ok) {
            console.log('Product added successfully!');
            console.log(await addRes.json());
        } else {
            console.log('Add Product Failed. Status:', addRes.status);
            console.log('Response:', await addRes.text());
        }

    } catch (err) {
        console.error('Error:', err);
    }
}

test();
