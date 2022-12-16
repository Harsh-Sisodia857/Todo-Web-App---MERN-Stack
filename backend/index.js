const express = require('express');
const port = 5000;
const app = express();
const db = require('./config/mongoose')
var cors = require('cors') 

// To use req.body
app.use(express.json())

app.use(cors())

// use express router
// require('./routes/index) is similar to require('./routes) in this case, it by default fetch routes
app.use('/', require('./routes/index'))

app.listen(port, function () {
    console.log(`Server is listening at port ${port}`);
})