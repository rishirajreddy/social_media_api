const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const Post = require("./post_model");

const User = mongoose.Schema({
    email: {
        type:String,
        unique:true,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    number: {
        type: String
    } ,
    password: {
        type: String,
        required: true
    },
    followers: [],
    following: [],
    posts: [Post] 
})

User.plugin(uniqueValidator);
module.exports = mongoose.model('user', User);