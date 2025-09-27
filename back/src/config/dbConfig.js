const mongoose = require('mongoose');
require('dotenv').config();


const URL = `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.qejfo9t.mongodb.net/MoviesData`

const dbConfig = async () => {
    await mongoose.connect(URL)
};

module.exports = dbConfig;