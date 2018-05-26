var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    flash      = require("connect-flash"),
    mongoose   = require("mongoose"),
    session    = require("express-session"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    MongoStore = require("connect-mongo")(session),
    Product    = require("./models/product"),
    User       = require("./models/user"),
    Cart       = require("./models/cart"),
    seedDB     = require("./product-seed");

var userRoutes = require("./routes/user");

mongoose.connect("mongodb://localhost/shopping");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());
seedDB();

//Passport and Session Config
app.use(session({
    secret: "This is secret bro!",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Takes user info and pass it to all templates rather than addind it to all tamplates one by one.
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.session = req.session;
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

app.get("/add-to-cart/:id", function(req, res){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
    
    Product.findById(productId, function(err, product){
        if(err){
            return res.redirect("/");
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect("/");
    });
});


app.use("/user", userRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!");
})