const Cors = require("../controllers/cors");

const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.UpdateUser);
router.get("/", UsersController.ShowUser);
router.options("/", Cors.Options);

module.exports = router;
