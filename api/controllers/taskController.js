const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
