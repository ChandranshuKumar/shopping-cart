var mongoose = require("mongoose");
var Product = require("./models/product");

var products = [
    {
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Assassin%27s_Creed_IV_-_Black_Flag_cover.jpg/220px-Assassin%27s_Creed_IV_-_Black_Flag_cover.jpg",
        title: "Black Flag",
        offer: "20% OFF and more",
        price: 340
    },
    {
        image: "http://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/tf/3/67758203-1-tf.jpg",
        title: "Roadster",
        offer: "10% OFF and more",
        price: 540
    },
    {
        image: "https://images-na.ssl-images-amazon.com/images/I/71KFFvyjGbL._SL500_SR200,200_.jpg",
        title: "Apple Cider Vineger",
        offer: "50% OFF and more",
        price: 50
    },
    {
        image: "https://d1s2zprapij148.cloudfront.net/image/cache/catalog/products/15680-200x200.jpg",
        title: "Bucket",
        offer: "40% OFF and more",
        price: 120
    }
];

function seedDB(){
    Product.remove({}, function(err){
        if(err){
            console.log(err);
        }
        // console.log("Removed Products");
        products.forEach(function(seed){
            Product.create(seed, function(err, product){
                if(err){
                    console.log(err);
                }
                // console.log("Prduct Created");
                product.save();
            });
        });
    });
}

module.exports = seedDB;



