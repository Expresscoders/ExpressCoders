const mong = require("mongoose");
const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/app.config")

exports.performLogin = async (req, res, next) => {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !emailOrUsername.length > 3 || !password || !password.length > 5) {
        res.send({
            "status": "INVALID",
            "message": "Invalid login fields!",
        }, 400);
    }

    console.log("Captured login request. Username or Email: ", emailOrUsername);

    let userSearchFilters = {};

    // Email or Username check
    if (emailOrUsername.indexOf("@") > -1) {
        userSearchFilters["Email"] = emailOrUsername
    } else {
        userSearchFilters["Username"] = emailOrUsername
    }

    // Find the user
    let thisUser = await UserModel.findOne(userSearchFilters);

    // Check password and do login
    if (thisUser) {
        // We are doing JWT authentication
        if (await bcrypt.compare(password, thisUser.Password)) {
            res.send({
                "status": "SUCCESS",
                "message": "Login success!",
                "data": {
                    "token": jwt.sign({
                        "payload": thisUser
                    }, config.APP_SECRET, {
                        expiresIn: "24h"
                    }),
                    "_id": thisUser._id,
                    "emailOrUsername": emailOrUsername,
                    "username": thisUser.Username
                }
            }, 200);
        }
    }

    res.send({
        "status": "FORBIDDEN",
        "message": "Invalid login details!",
    }, 400);
}

exports.performRegistration = async (req, res, next) => {
    console.log("Registration Request", "Details: ", req.body);
    let errors = {};

    // Checking fields
    const { username, email, password } = req.body;

    if (!(username && username.length > 7))
        errors["username"] = "Invalid username. Must be minimum 8 characters long!";

    if (!(email && email.length > 3 && email.indexOf("@") > -1))
        errors["email"] = "Invalid email.";

    if (!(password && password.length >= 6))
        errors["password"] = "Invalid password. Must be minimum 6 characters long!";

    if (Object.keys(errors).length) {
        res.send({
            "status": "INVALID",
            "message": "Invalid registration fields!",
            "data": errors
        }, 400);
    }

    console.log("Checking for new user request, email and username usage. Email: ",
        email, " Username: ", username);

    // All good till here. Proceed creating user.
    // Checking for email or username already used or not:
    const existingUser = await UserModel.findOne({
        Username: username,
        Email: email
    });

    if (existingUser) {
        console.log(existingUser);
        res.send({
            "status": "EXISTS",
            "message": "User already exists!",
            "data": errors
        }, 400);
    } else {

        const passwordEnc = await bcrypt.hash(password, 10);

        let newUser = new UserModel({
            Username: username,
            Email: email,
            Password: passwordEnc
        });

        await newUser.save().then(() => {
            res.send({
                "status": "Success",
                "message": "",
                "data": null
            }, 201);
        }).catch((error) => {
            res.send({
                "status": "FAILURE",
                "message": "Failed to register user!",
                "data": null
            }, 500);
        });
    }

}

exports.getProfileDetails = async (req, res, next) => {
    const user = await UserModel.findOne({"_id": req.user._id});
    res.send({
        "status": "OK",
        "data": user,
        "message": "Success"
    });
}