// Anurag Sumit Jagmeet
var express = require("express"),
    app= express(),
    bodyparser=require("body-parser"),
	mongoose=require("mongoose"),
	passport= require("passport"),
	LocalStrategy=require("passport-local"),
	User = require("./models/user");
	indexRoutes      = require("./routes/index");
	

	// const MongoClient = require('mongodb').MongoClient;
	// const uri = "mongodb+srv://anurag:9450441994@yelpcamp-siswa.mongodb.net/test?retryWrites=true&w=majority";
	// const client = new MongoClient(uri, { useNewUrlParser: true });
	// client.connect(err => {
	//   const collection = client.db("test").collection("devices");
	//   // perform actions on the collection object
	//   client.close();
	// });
	

mongoose.connect("mongodb://localhost:27017/flipr_v1",{ useNewUrlParser: true ,useUnifiedTopology: true}); 
//mongoose.connect("mongodb+srv://anurag:9450441994@yelpcamp-siswa.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true ,useUnifiedTopology: true}); 
//mongodb+srv://anurag:<9450441994>@yelpcamp-siswa.mongodb.net/test?retryWrites=true&w=majority

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public/"))

/// passport configuration.
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));//passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});
//used to do remove campground from each route address as this common among all of them
app.use("/", indexRoutes);

app.listen("3000", process.env.IP, function(){
	console.log("Yelcamp has started");
});