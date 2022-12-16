const Todo = require('../models/Todo')


module.exports.home = function (req, res) {
    Todo.find({}, function (err, tasks) {
        if (err) {
            console.log("Error in fetching the tasks from db");
            return;
        }
        return res.json({tasks})
        // return res.render('index', {
        //     title: "To do",
        //     tasks
        // })
    })
};

module.exports.createTask =async (req, res) => {
    try {
        const task = await Todo.create({
            description: req.body.description,
            category: req.body.category,
            user: req.user.id,
            dueDate : req.body.dueDate
        })
        return res.json({ task })
    } catch (err) {
        console.log("Error : ", err);
        return res.redirect('back');
    }
}

module.exports.deleteTask = (req, res) => {
    console.log("Request Query : ", req.query);
    let id = req.query.id;
    console.log("ID : ", id);
    // newid = id.split(',');
    // console.log("new ID : ", newid);
    // for (let i = 0; i < newid.length; i++) { // looping over newid  to delete all the checked value
        Todo.findByIdAndDelete(id, function (err) {
            if (err) {
                console.log('error : ', err)
            }
        })
    // }
    return res.json(`Task having ${id} is deleted`);
}


// module.exports.updateTask = (req, res) => {
//     try {
//         const { edescription, ecategory, edeadline } = req.body;
//         const newTask = {}
//         if (edescription) { newTask.edescription = edescription };
//         if (ecategory) { newTask.ecategory = ecategory };
//         if (edeadline) { newTask.edeadline = edeadline };

//         // Find the task to be updated and update it
//         let task = Todo.findById(req.params.id);
//         if (!task) { return res.status(404).send("Not Found") }
//         // User who updating the task == User who create the task

//         task = Todo.findByIdAndUpdate(req.params.id, { $set: newTask }, { new: true })
//         secondary.addEventListener("click", someSecondaryFunction, false);
//         res.json({ task });
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send("Internal Server Error")
//     }
// }