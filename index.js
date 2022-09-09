const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const connectDB = require("./db/db");
const auth_routes = require("./routes/auth_routes");
const post_routes = require("./routes/post_routes");

connectDB();
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json({extended: false}));

app.use("/api", auth_routes, post_routes);

app.get('/' , (req , res)=>{
   res.send('hello from simple server :)')
})

module.exports = app;