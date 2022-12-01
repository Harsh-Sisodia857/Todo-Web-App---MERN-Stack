const User = require('../models/User');
const { validationResult } = require('express-validator');


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
    // Instead of getting error in console of unique user handle it
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json({error : "User with this email exists"})
    }
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        dueDate: req.body.dueDate
    });

    res.json({ user })
}