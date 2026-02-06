require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const username = 'dreamdesign@222';
  const password = 'admin123';
  const email = 'abhishek481828@gmail.com'; // Use a real email for password reset

  const exists = await Admin.findOne({ $or: [{ username }, { email }] });
  if (exists) {
    exists.username = username;
    exists.password = password;
    exists.email = email;
    await exists.save();
    console.log('Admin updated!');
    process.exit(0);
  }

  const admin = new Admin({ username, password, email });
  await admin.save();
  console.log('Admin created successfully!');
  process.exit(0);
}

createAdmin();
