const express = require('express')
const router = express.Router();
const todoController = require('../controller/todoController')

router.get('/createtask', todoController.tasks)
// router.get('/:id', todoController.tasks)
// router.get('/:id', todoController.tasks)

module.exports = router;
