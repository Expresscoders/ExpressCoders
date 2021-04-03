const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authSettings = require("../config/auth");
const User = mongoose.model("User");

const generateToken = (user) => {
    const payload = {
        _id: user._id,
    };
    // Sign token
    const token = jwt.sign(
        payload,
        authSettings.secret,
        authSettings.options
    );
    return {
        userData: {
            username: user.username,
            email: user.email
        },
        token: token
    };
}

exports.register = async (req, res, next) => {
    return await new User(req.body).save()
        .then(
            user => res.status(201).json(generateToken(user)),
            err => res.status(400).json(err)
        ).catch(next);
}

exports.login = async (req, res, next) => {
    //Find user by email
    return await User.findOne({ email: req.body.email }).then(user => {
        const invalidCredentialsMsg = { errorMessage: "username or password is incorrect." };
        if (!user) {
            return res.status(400).json(invalidCredentialsMsg);
        }
        // Check password
        return user.comparePassword(req.body.password).then(isMatch => {
            if (!isMatch) {
                return res.status(400).json(invalidCredentialsMsg);
            } else {
                return res.status(200).json(generateToken(user));
            }
        }).catch(next);
    });
}