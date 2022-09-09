const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.register = async(req,res) => {
    const {email, username, number ,password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email,
        username,
        number,
        password: hashedPassword
    })
    let token = jwt.sign({email: req.body.email}, 
        process.env.JWT_KEY,
        { expiresIn: '1h'}
    );
    await newUser.save()
        .then((result) => {
            console.log("User resgistered!!");
            res.status(200).json({msg:"User registered", token, result})
        })
        .catch(err => {
            let msg = "user validation failed: email: Error, expected `email` to be unique. Value: `"+email+"`";
            if(msg === err.message){
                console.log("Email already exists");
                res.status(409).json("User already exists");
            }
        })
}

exports.authenticate = async(req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    try {
        if(!user){
            return res.status(404).json({
                status:"Login Failed!!",
                msg:"User not found!!"
            })
        }
        const isCorrect = await bcrypt.compare(password, user.password);
        if(isCorrect){
            let token = jwt.sign({email: email},
                process.env.JWT_KEY, {
                    expiresIn: "1h"
                }
                );
                console.log("Login Success");
                res.status(200).json({
                    msg:"User Authentication Success",
                    user:email,
                    token
                })
        }else {
            res.status(401).json({
                msg:"Incorrect email or password"});
            console.log("Login failed!!");
        }
    }
    catch(err) {
        res.status(500).json(err.message);
        console.log(err);
    }

}

exports.followUser = async(req,res) => {
    const followedUser = await User.findOne({_id: req.params.id});
    const followedUserName = followedUser.get("email").toString();
             User.bulkWrite([
                {updateOne: {
                    "filter": {_id: req.params.id},
                    "update": {
                        $addToSet: {
                            followers: req.decoded.email
                        }
                    },
                    "upsert": true
                }},
                {updateOne: {
                    "filter": {email: req.decoded.email},
                    "update": {
                        $addToSet: {
                            following: followedUserName
                        }
                    },
                    "upsert": true
                }}
            ])
            .then((result) => {
                console.log(result)
                res.status(200).json({msg:`Following ${followedUserName} success`})
            })
            .catch(err => {
                console.log(err.message);
                res.status(500).json({err: err.message})
            })
}


exports.unfollowUser = async(req,res) => {
    const followedUser = await User.findOne({id: req.params.id});
    const followedUserName = followedUser.get("email").toString();

    User.bulkWrite([
                {updateOne: {
                    "filter": {_id: req.params.id},
                    "update": {
                        $pull: {
                            followers: req.decoded.email
                        }
                    }
                }},
                {updateOne: {
                    "filter": {email: req.decoded.email},
                    "update": {
                        $pull: {
                            following: followedUserName
                        }
                    }
                }}
            ])
            .then((result) => {
                console.log(result);
                res.status(200).json({msg:"UnFollowed", result})
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({err: err.message})
            })
    }

exports.getUserDetails = async(req,res) => {
    User.findOne({email: req.decoded.email})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({err: err.message})
        })
}

exports.getOtherUserDetails = async(req,res) => {
    User.findOne({_id: req.params.id})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({err: err.message})
        })
}

