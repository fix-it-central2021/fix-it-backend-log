
const express = require("express");
const app = express();
app.use(express.json());




const usuarios = require('./routes/users')
const Login = require('./routes/login')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,access-token,access-user");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE , PUT");
    next();
  });
  
app.use('/login',Login)
app.use('/users',usuarios)


app.use(express.static('public'))

module.exports = app
