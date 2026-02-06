const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const verifyAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const admins = await User.find({ role: 'admin' });
        console.log(`Found ${admins.length} admin(s).`);

        if (admins.length > 0) {
            admins.forEach(u => console.log(`Admin: ${u.email} (ID: ${u._id})`));
        } else {
            console.log('No admin found. Creating default admin...');
            const admin = await User.create({
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'admin123', // Will be hashed
                role: 'admin'
            });
            console.log(`Admin created: ${admin.email} / admin123`);
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

verifyAdmin();
