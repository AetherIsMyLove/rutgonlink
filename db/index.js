const mongoose = require('mongoose');
require('dotenv').config();

async function run() {
  const uri = `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.rqvs0yb.mongodb.net/myDatabase?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(uri);
    console.log(' Connected to MongoDB Atlas');
  } catch (err) {
    console.error(' Connection error:', err.message);
  }
}

module.exports = { run };