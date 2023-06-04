const tasksModel = require("../model/tasksModel");
const ListService = require("../services/common/ListService")
const mongoose = require("mongoose");
//Create Tasks
exports.createTask = (req, res) => {
    let reqBody = req.body
    reqBody.email = req.headers['email'];
    tasksModel.create(reqBody, (err, data) => {
        if (err) {
            res.status(404).json({ status: "fail", data: err })
        }
        else {
            res.status(200).json({ status: "success", data: data })
        }
    })
}

//Find tasks
exports.findTasks = (req, res) => {
    let email = req.headers['email'];
    tasksModel.aggregate([
        { $match: { email: email } },
        {
            $project: {
                _id: 1, title: 1, description: 1, status: 1,
                createdDate: {
                    $dateToString: {
                        date: "$createdDate",
                        format: "%d-%m-%Y"
                    }
                }
            }
        }
    ], (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        }
        else {
            res.status(200).json({ status: "success", data: data })
        }
    })
}

//Find tasks by ID
exports.findTasksById = (req, res) => {
    let id = new mongoose.Types.ObjectId(req.params.id);

    let email = req.headers["email"];
    tasksModel.aggregate([
        {
            $match: {
                _id: id
                , email: email
            }
        },
        {
            $project: {
                _id: 1, title: 1, description: 1, status: 1,
                createdDate: {
                    $dateToString: {
                        date: "$createdDate",
                        format: "%d-%m-%Y"
                    }
                }
            }
        }
    ], (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        }
        else {
            res.status(200).json({ status: "success", data: data })
        }
    })
}


//Delete task
exports.deleteTask = (req, res) => {
    let id = req.params.id;
    let Query = { _id: id };
    tasksModel.remove(Query, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        }
        else {
            res.status(200).json({ status: "success", data: data })
        }
    })
}

//Update tasks
exports.updateTaskStatus = (req, res) => {
    let id = req.params.id;
    let status = req.params.status;
    let Query = { _id: id };
    let reqBody = { status: status }
    tasksModel.updateOne(Query, reqBody, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        }
        else {
            res.status(200).json({ status: "success", data: data })
        }
    })
}

exports.TaskList = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let SearchArray = [{ title: SearchRgx }, { status: SearchRgx }]
    let Result = await ListService(req, tasksModel, SearchArray)
    res.status(200).json(Result)
}


//Select by status
exports.listTaskByStatus = (req, res) => {
    let status = req.params.status;
    let email = req.headers['email'];
    debugger;
    tasksModel.aggregate([
        { $match: { status: status, email: email } },
        {
            $project: {
                _id: 1, title: 1, description: 1, status: 1,
                createdDate: {
                    $dateToString: {
                        date: "$createdDate",
                        format: "%d-%m-%Y"
                    }
                }
            }
        }
    ], (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        }
        else {
            res.status(200).json({ status: "success", data: data })
        }

    })
}

//Count Status
exports.taskStatusCount = (req, res) => {
    let email = req.headers['email'];
    tasksModel.aggregate([
        { $match: { email: email } },
        { $group: { _id: "$status", sum: { $count: {} } } }
    ], (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        }
        else {
            res.status(200).json({ status: "success", data: data })
        }
    })
}
