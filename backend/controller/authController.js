const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const JWT_SECRET = "HarshWantsToBeWebDeveloper";


module.exports.login = function (req, res) {
    res.send('Login')
}

//createUser
module.exports.signup =async function (req, res) {
    // ----- to save the data in mongodb
    // const user = User(req.body);
    // user.save();
    // -----

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Instead of getting error in console of unique user handle it
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json({error : "User with this email exists"})
    }
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        dueDate: req.body.dueDate
    });
    const data = {
        user: {
            id: user.id
        }
    }
    // implementing jsonwebtoken npm package which helps to validate authentic user
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken })
}