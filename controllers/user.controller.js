const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const logUser = require("../middleware/userLogger.middleware");

const registerUser = async (req, res) => {
    const { username, email, password, confirmPassword, dob, location,role } = req.body;
    const checkExits = await User.findOne({ email })

    if (checkExits) {
        return res.status(400).send({ message: "Email already exits, Please login or try with different account" })
    }
    const genSalt = 10;
    const salt = bcrypt.genSaltSync(genSalt)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const hashedconfirmePassword = bcrypt.hashSync(confirmPassword, salt)

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        confirmPassword:hashedconfirmePassword,
        dob,
        location,
        role
    })

    try {
        await newUser.save()
        res.status(200).send({ message: "Register successful", user: newUser })
    } catch (error) {
      res.status(500).send({message:"Something went wrong", err:error})
    }
}
 

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if(! email || !password){
        return res.status(400).send({message:"email and password fields required"})
    }
 
    const RegisteredUser = await User.findOne({ email })

    try {
        if (!RegisteredUser) {
            res.status(400).send({ message: "Email could not found" })
        } else {
            isMatch = bcrypt.compareSync(password, RegisteredUser.password);

            if (isMatch) {
                logUser(RegisteredUser.username,RegisteredUser.role)
                const token = jwt.sign({ userId: RegisteredUser._id }, process.env.JWT_SECRET)
                res.status(200).send({ msg: "Login successful", token: token, email: RegisteredUser.email })
            } else {
                res.status(400).send({ msg: "Invalid credentials" })
            }
        }
    } catch (error) {
        res.status(500).send({ error: "Internel server error" })
    }

}



module.exports = { registerUser, loginUser }