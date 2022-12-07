const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.UpdateUser);
router.get("/", UsersController.ShowUser);

module.exports = router;
