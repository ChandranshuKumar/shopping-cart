var express    = require("express"),
    app        = express(),
    mongoose   = require("mongoose"),
    flash      = require("connect-flash"),
    bodyParser = require("body-parser"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    Product    = require("./models/product"),
    User       = require("./models/user"),
    seedDB     = require("./product-seed");


mongoose.connect("mongodb://localhost/shopping");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());
seedDB();

//Passport and Session Config
app.use(require("express-session")({
    secret: "This is secret bro!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Takes user info and pass it to all templates rather than addind it to all tamplates one by one.
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//Routes
app.get("/", function(req, res){
    Product.find({}, function(err, products){
        if(err){
            console.log(err);
        }
        else{
            res.render("index", {products: products});
        }
    });
});

//REGISTER
app.get("/user/signup", function(req, res){
   res.render("user/signup"); 
});
app.post("/user/signup", function(req, res){
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
app.get("/user/signin", function(req, res) {
    res.render("user/signin");
});
app.post("/user/signin", passport.authenticate("local", {
    successRedirect : "/",
    failureRedirect : "/user/signin"
}), function(req, res) {});
//LogOut
app.get("/user/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!");
})