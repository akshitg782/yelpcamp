var Campground=require("../models/campground");
var Comment=require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership=function(req,res,next){
    if(req.isAuthenticated()){   
    Campground.findById(req.params.id,function(err,foundCampground){
       if(err){
           req.flash("error","Campground not found");
           res.redirect("back");
       } else{
    //IMPORTANT NOTE TO BE REMEMBER;
           //foundCampground.author.id and req.user._id both will print the same value, but they arent same, because foundCampground.author.id will return mongoose object and req.user._id will return a string. Thus we will not use foundCampground.author.id===req.user_id  , instead we will use foundCampground.author.id.equals(req.user._id)
     if(foundCampground.author.id.equals(req.user._id)){
            next();
        } else{
            req.flash("error","you dont have permission to that");
         res.redirect("back");
            }
       }
    });    
        
    }else{
        req.flash("error","you need to be logged in to that");
        res.redirect("back");
    }
  
};

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){   
    Comment.findById(req.params.comment_id,function(err,foundComment){
       if(err){
        
           res.redirect("back");
       } else{
     if(foundComment.author.id.equals(req.user._id)){
            next();
        } else{
           req.flash("error","you dont have permission to that"); 
         res.redirect("back");
            }
       }
    });    
        
    }else{
        req.flash("error","you need to be logged in to that");
        res.redirect("back");
    }
  
}



middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to that");
    res.redirect("/login");
}





module.exports= middlewareObj;