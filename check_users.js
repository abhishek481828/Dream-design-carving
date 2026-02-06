const mongoose = require('mongoose');
const User = require('./backend/models/User');
const dotenv = require('dotenv');

dotenv.config({ path: './backend/.env' });

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const users = await User.find({});
        console.log('Users found:', users.length);
        users.forEach(user => {
            console.log(`Email: ${user.email}, Role: ${user.role}, ID: ${user._id}`);
        });

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkUsers();
