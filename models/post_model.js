const mongoose = require('mongoose');
const {format} = require("date-fns");

const Comment = new mongoose.Schema({
    name: {
        type:String,
    },
    comment: {
        type:String
    }  ,
    commentedAt: {
        type:String,
        default: format(new Date(),'yyyy-MM-dd HH:mm:ss')
    }
})

const Post = mongoose.Schema({
    title:{ 
        type:String
    },
    desc: {
        type:String
    },
    created_at: {
        type: String,
        default: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    },
    comments: [Comment],
    likedBy:[]
}
)

module.exports = Post
