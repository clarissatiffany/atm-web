var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser());

app.get('/login', function(req, res){
    if(is_valid(req.cookies.username,req.cookies.session))res.redirect('/profile');
});

app.get('/register', function(req, res){
    if(is_valid(req.cookies.username,req.cookies.session))res.redirect('/profile');
});

app.listen(3000);