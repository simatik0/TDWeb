const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoUrl = process.env.mongo_db_url;
    
    if (!mongoUrl) {
      throw new Error('MongoDB URL not found in environment variables');
    }

    await mongoose.connect(mongoUrl);
    console.log('✓ Connexion à MongoDB réussie');
    
  } catch (error) {
    console.error('✗ Erreur de connexion à MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
