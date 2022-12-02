const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User')
const {createTask, deleteTask, updateTask } = require("../controller/homeController");
const Todo = require('../models/Todo')


router.get('/', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        let tasks =await Todo.find({ user : userId})
        return res.json({ tasks })
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


router.get('/createtask', fetchuser, createTask)
router.post('/deletetask', fetchuser, deleteTask)
// router.get('/updatetask', updateTask)

module.exports = router;
