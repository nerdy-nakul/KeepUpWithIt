const express = require("express");
const { getTasks, createTask } = require("../controllers/taskController");
const router = express.Router();

router.get("/tasks", getTasks);
router.post("/tasks", createTask);

module.exports = router;
