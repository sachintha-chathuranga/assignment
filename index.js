const express = require("express");
const bodyParser = require('body-parser');
const app = express();


const userRout = require('./rout/user');

app.use(bodyParser.urlencoded({extended: true}))
// app.use(express.json());



app.use("/api", userRout);

app.listen(3000, console.log("server is runing on port 3000"));