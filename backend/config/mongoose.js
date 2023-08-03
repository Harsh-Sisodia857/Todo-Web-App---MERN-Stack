const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0/todoWebApp")

const db = mongoose.connection;

db.on('error', console.error.bind(console,"Error Connecting to Mongodb"))
db.once('open', function () {
    console.log("Connected to Mongodb successfully");
})

module.exports = db;