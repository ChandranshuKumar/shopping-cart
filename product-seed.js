var mongoose = require("mongoose");
var Product = require("./models/product");

var products = [
    {
        image: "https://images-eu.ssl-images-amazon.com/images/I/61FN63zv-cL._SL150_.jpg",
        title: "JBL GO",
        offer: "20% OFF and more",
        price: 1700
    },
    {
        image: "https://images-eu.ssl-images-amazon.com/images/I/41ZjKnb4a3L._AC_US160_.jpg",
        title: "SanDisk Cruzer Blade 16GB",
        offer: "10% OFF and more",
        price: 500
    },
    {
        image: "https://images-eu.ssl-images-amazon.com/images/I/41afx-tDYqL._AC_US160_.jpg",
        title: "TLC 562 VR",
        offer: "50% OFF and more",
        price: 9999
    },
    {
        image: "https://images-eu.ssl-images-amazon.com/images/I/31BHWx4ql7L._AC_US218_.jpg",
        title: "Sony PS4 1 TB Slim Console",
        offer: "40% OFF and more",
        price: 32000
    },
    {
        image: "https://images-eu.ssl-images-amazon.com/images/I/31LPmQMJm0L._AC_US160_.jpg",
        title: "Sennheiser CX 180 Earphone",
        offer: "40% OFF and more",
        price: 800
    },
    {
        image: "https://images-eu.ssl-images-amazon.com/images/I/51+96dogGHL._AC_US160_.jpg",
        title: "Nike Strike",
        offer: "40% OFF and more",
        price: 520
    },
    {
        image: "https://images-eu.ssl-images-amazon.com/images/I/81QUSIDc2NL._SL150_.jpg",
        title: "Cosmic Byte CB-M-05 Pulsar V2",
        offer: "40% OFF and more",
        price: 625
    }
];

function seedDB(){
    Product.remove({}, err => {
        if(err) console.log(err);
        products.forEach(seed => {
            Product.create(seed, (err, product) => {
                if(err) console.log(err);
                product.save();
            });
        });
    });
}

module.exports = seedDB;