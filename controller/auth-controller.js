const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
    let isAuthenticated = false;
    try {
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(409).json({
                isAuthenticated,
                error: "Sorry a user with this e-mail address already exists",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });
        isAuthenticated = true;
        return res.status(200).json({ isAuthenticated });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
const signIn = async (req, res) => {
    let success = false;
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({
                success,
                error: "The e-mail address and/or password you specified are not correct.",
            });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({
                success,
                error: "The e-mail address and/or password you specified are not correct.",
            });
        }
        success = true;
        const data = {
            _id: user._id,
        };
        const maxAge = 3 * 24 * 60 * 60;
        const authtoken = jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: maxAge,
        });
        return res
            .status(200)
            .json({ token: authtoken, email: user.email, userName: user.name });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

module.exports = {
    signUp,
    signIn,
};
