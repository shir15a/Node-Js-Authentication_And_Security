const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const usersController = require("../controllers/users.controllers");

router
    .get("/",auth, usersController.getAll)
    .get("/:id", usersController.getprofile)
    .post("/", usersController.create)
    .post("/login", usersController.login)
    .post("/logout",auth, usersController.logout)
    .post("logoutAll", auth, usersController.logoutAll)
    .put("/:id", usersController.update)
    .delete("/:id", usersController.remove)

module.exports = router;
