const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI)
const db = mongoose.connection;

db.on('error', console.error.bind(console,"Error Connecting to Mongodb"))
db.once('open', function () {
    console.log("Connected to Mongodb successfully");
})

module.exports = db;