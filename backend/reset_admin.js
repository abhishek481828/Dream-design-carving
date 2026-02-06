const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const resetAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const email = 'admin@example.com';
        const user = await User.findOne({ email });
        if (user) {
            user.password = 'admin123'; // Will be hashed by pre-save
            await user.save();
            console.log(`Password for ${email} reset to 'admin123'`);
        } else {
            console.log('User not found');
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

resetAdmin();
