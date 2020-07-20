require('dotenv').config();
var express          = require("express");
var app              = express();
var bodyParser       = require('body-parser');
var mongoose         = require('mongoose');
var passport         = require('passport'),
LocalStrategy        = require('passport-local');
var Campground       = require('./models/campground');
var flash            = require('connect-flash');
var Comment          = require('./models/comment');
var User             = require('./models/user');
var methodOverride   = require('method-override');
var seedDB           = require('./seeds');
var commentRoutes    = require('./routes/comments');
var campgroundRoutes = require('./routes/campground');
var indexRoutes      = require('./routes/index');

mongoose.connect("mongodb://localhost/yelp_camp_3",  { useNewUrlParser: true});

//seedDB();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(require('express-session')({
    secret: "Enchantress god",
    resave: false,
    saveuninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelcamp Server has started");
});

