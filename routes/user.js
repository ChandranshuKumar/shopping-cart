var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User    = require("../models/user");
var middleware = require("../middleware");

//REGISTER
router.get("/signup", function(req, res){
   res.render("user/signup"); 
});
router.post("/signup", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/user/signup");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to GameCart " + user.username);
            res.redirect("/");
        });
    });
});
//LOGIN
router.get("/signin", function(req, res) {
    res.render("user/signin");
});
router.post("/signin", passport.authenticate("local", {
    successRedirect : "/",
    failureRedirect : "/user/signin"
}), function(req, res) {});
//LogOut
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});
//Profile
router.get("/profile", middleware.isLoggedIn, function(req, res) {
   res.render("user/profile"); 
});


module.exports = router;