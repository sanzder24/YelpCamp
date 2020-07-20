var express = require('express');
var router  = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware/index');
var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

router.get("/", function(req, res){

         if(req.query.search) 
    { const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        console.log(req.query.serch);
        Campground.find({name: regex}, function(err, allCampgrounds){
           if(err){
               console.log(err);
               res.direct("/campgrounds");
           } 
           else{
                res.render("Index", {campgrounds:allCampgrounds});
           }
        });
    }
    else {    
            Campground.find({}, function(err, allcampgrounds){
            if (err){
             console.log("error");
            }  
            else{
                res.render("Index", {campgrounds:allcampgrounds});
            }
        });
    }
}); 

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      console.log(err);
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newCampground = {name: name, image: image, description: desc, author:author, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
  });
});

//Edit

router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            console.log(foundCampground);
              res.render("edit", {campgrounds: foundCampground});
        }
    })
  
});

router.get("/new",middleware.isLoggedIn, function(req, res){
   res.render("new"); 
});

router.get("/:id", function(req, res){
    
 Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground){
     if(err){
         console.log(err);
     }
     else{
          res.render("show", {campground:foundCampground}); 
     }
 });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      return res.redirect('back');
    }
    req.body.campground.lat = data[0].latitude;
    req.body.campground.lng = data[0].longitude;
    req.body.campground.location = data[0].formattedAddress;

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            console.log("success");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
  });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;