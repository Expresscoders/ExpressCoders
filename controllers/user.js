const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authSettings = require("../config/auth");
const secure = require("../middleware/secure");
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
        const invalidCredentialsMsg = { error: "username or password is incorrect." };
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

exports.find = [
    secure,
    (req, res, next) => {
        return res.status(200).json({
            username: req.user.username,
            email: req.user.email
        });
    }];

exports.update = [
    secure,
    async (req, res, next) => {
        //Delete the password value if there is any, as this is not the route 
        //we would use to update user password.
        delete req.body['password'];
        return await req.user.set(req.body).save()
            .then(
                user => res.status(201).json({
                    username: user.username,
                    email: user.email
                }),
                err => res.status(400).json(err)
            ).catch(next);
    }];