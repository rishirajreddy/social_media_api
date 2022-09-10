const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();
const url = "mongodb+srv://mrrobot:mrrobot@empmngmt.cs734kp.mongodb.net/social_medial_api?retryWrites=true&w=majority";


const connectDB = () => {
    mongoose.connect(url,{
        useNewUrlParser : true, useUnifiedTopology: true
    });
        console.log("Connected to MongoDB")
}

module.exports = connectDB;
