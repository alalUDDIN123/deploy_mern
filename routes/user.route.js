const express = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");
const validateUserFields = require("../middleware/fieldAnalyzer.middleware");
const userRouter = express.Router();
userRouter.post("/register", validateUserFields,registerUser);
userRouter.post("/login", loginUser);


module.exports = { userRouter }