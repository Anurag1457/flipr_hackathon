var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/User");


//root route
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username,email:req.body.email});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/landing");
});

// google oauth

router.get('/success', (req, res) => res.redirect("/",{usecurrentUser:profile}));
router.get('/error', (req, res) => res.send("error logging in"));

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '955170330138-peek1s3kjkl78dtpfg7m8pdudajmfnf2.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'OeZDElHj3FvIRgc5QeWU4nvP';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      //userProfile=profile;
      return done(null, profile)});
  }
));
 
router.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    console.log(res);
    res.redirect('/success');
  });

module.exports = router;