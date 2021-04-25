const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controllers");

router
    .get("/", usersController.getAll)
    .get("/:id", usersController.getOne)
    .post("/", usersController.create)
    .put("/:id", usersController.update)
    .delete("/:id", usersController.remove)

module.exports = router;
