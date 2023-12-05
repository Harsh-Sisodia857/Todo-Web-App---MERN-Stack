const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://harshkumarsisodia99:yimjXg3xRfNGOEGD@cluster0.ks55g6u.mongodb.net/todoWebApp")

const db = mongoose.connection;

db.on('error', console.error.bind(console,"Error Connecting to Mongodb"))
db.once('open', function () {
    console.log("Connected to Mongodb successfully");
})

module.exports = db;