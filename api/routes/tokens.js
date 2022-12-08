const Cors = require("../controllers/cors");

const express = require("express");
const router = express.Router();

const TokensController = require("../controllers/tokens");

router.post("/", TokensController.Create);
router.options("/", Cors.Options);

module.exports = router;
