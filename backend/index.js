const express = require('express');
const port = 8000;
const app = express();

app.listen(port, function () {
    console.log(`Server is listening at port ${port}`);
})