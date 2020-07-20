var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment = require('./models/comment');

var data = [
    {
        name: "Earth Shaker",
        image: "https://pages.firstblood.io/pages/wp-content/uploads/2018/07/dota-2-hero-guide-970x570.jpg",
        description: "Fun character to play"
    },
    {
        name: "Juggernaut",
        image: "https://www.dailyesports.gg/wp-content/uploads/2019/06/dota-cover-david-kelly-1200x900.jpg",
        description: "Yucky character to play"
    },
    {
        name: "Razor",
        image: "https://pages.firstblood.io/pages/wp-content/uploads/2018/12/razor-hero-guide-970x570.jpg",
        description: "the Lightning Revenant, is a ranged agility hero who works as a position-based tank/carry that employs his abilities to deal massive damage in a relatively short amount of time, chase down the fleeing injured with his speed, and inflict debuffs on more powerful foes. Razor prefers to keep his position or kite his enemies allowing his spells to unleash its full potential."
    },
    
    ]

function seedDB(){
    Campground.remove({}, function(err){
// if(err){
//     console.log(err);
//     }
//   console.log("Removed Camp");
//               data.forEach(function (seed){
//                 Campground.create(seed, function(err, campground){
//                     if(err){
//                         console.log(err);
                    
//                      }
//                      else {
//                     console.log("added a camp");
//                     Comment.create({
//                         text:"Hero of a game",
//                       author: "Hussain.M"
//                     }, function(err, comment){
//                         if (err){
//                             console.log(err);
//                         }
//                         else{
//                              campground.comments.push(comment);
//                              campground.save();
//                              console.log("created comment");
//                         }
//                     });
//                      }
//                 });
//         });
  
    });


}
module.exports = seedDB;
