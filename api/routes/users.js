const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/", UsersController.Index); // create route to retrieve user info
router.post("/", UsersController.Create);

module.exports = router;
