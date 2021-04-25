const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task.controllers");

router
    .get("/", taskController.getAll)
    .get("/:id", taskController.getOne)
    .post("/", taskController.createTask)
    .put("/:id", taskController.updateTask)
    .delete("/:id", taskController.remove)


module.exports = router;
