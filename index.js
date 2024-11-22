var express = require('express');
var cookieParser = require('cookie-parser');
var nunjucks = require('nunjucks');

var storage = require("./storage");
var auth = require("./auth");

var app = express();

app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.json());
nunjucks.configure(__dirname, {
    autoescape: true,
    express: app
});

app.get('/login', function(req, res){
    if(auth.is_valid(req.cookies["USERNAME"],req.cookies["SESSION"])){
        res.redirect('/profile');
        return;
    }
    res.cookie("USERNAME", "");
    res.cookie("SESSION", "");
    res.render("templates/login.njk.html");
    return;
});

app.post('/login', function(req, res){
    if(auth.is_valid(req.cookies["USERNAME"],req.cookies["SESSION"]))res.redirect('/profile');
    if(!req.body.username){
        res.render("templates/login.njk.html", {message: "Please enter a username!"});
        return;
    }
    if(!req.body.pin){
        res.render("templates/login.njk.html", {message: "Please enter a pin!"});
        return;
    }
    session = auth.login(req.body.username,req.body.pin);
    if(!auth.is_valid(req.body.username,session)){
        res.render("templates/login.njk.html", {message: "Incorrect credentials!"});
        return;
    }
    res.cookie("USERNAME", req.body.username);
    res.cookie("SESSION", session);
    res.redirect("/profile");
});

app.get('/register', function(req, res){
    if(auth.is_valid(req.cookies["USERNAME"],req.cookies["SESSION"]))res.redirect('/profile');
    res.cookie("USERNAME", "");
    res.cookie("SESSION", "");
    res.render("templates/register.njk.html");
});

app.post('/register', function(req, res){
    if(auth.is_valid(req.cookies["USERNAME"],req.cookies["SESSION"]))res.redirect('/profile');
    res.cookie("USERNAME", "");
    res.cookie("SESSION", "");
    if(!req.body.username){
        res.render("templates/register.njk.html", {message: "Please enter a username!"});
        return;
    }
    if(!req.body.pin){
        res.render("templates/register.njk.html", {message: "Please enter a pin!"});
        return;
    }
    if(!auth.create_account(req.body.username,req.body.pin)){
        res.render("templates/register.njk.html", {message: "Cannot create account (it probably exists)!"});
        return;
    }
    res.cookie("USERNAME", req.body.username);
    res.cookie("SESSION", auth.login(req.body.username,req.body.pin));
    res.redirect("/profile");
});

app.use(function (req, res, next) {
    if(!auth.is_valid(req.cookies["USERNAME"],req.cookies["SESSION"])){
        res.redirect("/login");
        return;
    }
    next();
});

app.get("/profile", function(req,res){
    res.render("templates/profile.njk.html", {username: req.cookies["USERNAME"], balance: storage.get_funds(req.cookies["USERNAME"])});
});

app.get("/logout", function(req,res){
    res.cookie("USERNAME", "");
    res.cookie("SESSION", "");
    res.redirect("/login");
})

app.listen(3000);