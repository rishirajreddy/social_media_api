const User = require("../models/user_model");
const {format, compareDesc, parseISO} = require("date-fns");

exports.createPost = async(req,res) => {
    const {title, desc} = req.body;

    User.findOneAndUpdate(
        {email: req.decoded.email},
        {new: true},
        (err, data) => {
            if(err) {
                console.log(err);
                res.status(500).json({msg:"Unable to create post"})
            }else{
                    const post = {
                        title: title,
                        desc: desc
                    }
                    data.posts.push(post);
                    data.save()
                        .then(() => {
                            res.status(200).send({msg:"Post Created"})
                        })
                        .catch(err => {
                            const title_error = err.message.substring(39, err.message.length)
                            const desc_error = err.message.substring(39, err.message.length)

                            if(err.message.substring(39, err.message.length) === title_error){
                                res.status(400).send({msg:"Title is required"})
                            }else {
                                res.status(400).send({msg:"Description is required"})
                            }
                            console.log(err.message);
                        })
            }   
        }
        )
}

exports.deletePost = async(req,res) => {
    User.findOneAndUpdate(
        {"posts": {$elemMatch: {_id: req.params.id}}},
        {
            $pull: {
                posts: {
                    _id: req.params.id
                }
            }
        },
        ).then((result) => {
            // console.log("Post Del    eted");
            res.status(200).send({msg:"Post Deleted"})
        })
        .catch(err => {
            console.log(err);
        })
}

exports.likePost = async(req,res) => {
    User.findOne(
        {"posts": {$elemMatch: {_id: req.params.id}}},
        (err, post) => {
            if(err){
                console.log(err);
                res.status(404).json({msg:"Invalid Post ID"})
            }else {
                for (const item of post.posts) {
                    if(item._id.toString() === req.params.id){
                            if(!item.likedBy.includes(req.decoded.email)){
                                item.likedBy.push(req.decoded.email);
                            }
                            post.save()
                                .then((result) => {
                                    res.status(200).send({msg:"Post Liked", item})
                                })   
                                .catch(err => {
                                    res.status(500).json("BadRequest")
                                    console.log(err.message);
                                })
                        
                    }
                }
            }
        }
    )
}

exports.unlikePost = async(req,res) => {
    User.findOne(
        {"posts": {$elemMatch: {_id: req.params.id}}},
        (err, post) => {
            if(err){
                console.log(err);
                res.status(404).json({msg:"Invalid Post ID"})
            }else {
                for (const item of post.posts) {
                    if(item._id.toString() === req.params.id){
                        if(item.likedBy.includes(req.decoded.email)){
                            const index = item.likedBy.findIndex(x => x.user === req.decoded.email);
                            item.likedBy.splice(index, 1);
                            post.save()
                                .then(() => {
                                    res.json({msg:"Post Disliked", item})
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({msg:err.message})
                                })
                        }else {
                            res.json("First Like the post to unlike it")
                        }
                    }
                }
            }
        }
    )
}

exports.addComments = async(req,res) => {
    User.findOne(
        {"posts": {$elemMatch: {_id: req.params.id}}},
        (err, post) => {
            if(err){
                console.log(err);
                res.status(404).json({msg:"Invalid Post ID"})
            }else {
                for (const item of post.posts) {
                    if(item._id.toString() === req.params.id){
                        const comment = {
                            name: req.decoded.email,
                            comment: req.body.comment
                        }
                        item.comments.push(comment);
                        post.save()
                        .then((result) => {
                            res.json({msg:"Commented Added", item})
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({msg:err.message})
                        })
                    }
                }
            }
        }
    )
}

exports.getPost = async(req,res) => {
    User.findOne(
        {"posts": {$elemMatch: {_id: req.params.id}}},
    )
    .then((data) => {
        for (const post of data.posts) {
            if(post._id.toString() === req.params.id){
                res.status(200).send(post);
            }
        }
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getAllPosts = async(req,res) => {
    let postsArr = [];

    User.findOne({email: req.decoded.email})
        .then((data) => {
            for (let i = 0; i < data.posts.length; i++) {
                postsArr.push(data.posts[i])
            }
            let sortedArr = postsArr.flat().sort((a, b) => compareDesc(parseISO(a.created_at), parseISO(b.created_at)));
            res.status(200).send({posts: sortedArr});
            console.log("Fetched");
        })
}