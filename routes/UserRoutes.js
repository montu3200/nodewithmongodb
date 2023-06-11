const express = require("express");
const router = express.Router();
const { createUser,login,getAllUser } = require("../controllers/UserController");
const authMiddleware = require('./../middleware/auth');

router.route("/").post(createUser);
router.route("/login").post(login);
router.route("/").get(authMiddleware,getAllUser);


module.exports = router;