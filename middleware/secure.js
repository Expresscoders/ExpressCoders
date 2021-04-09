const User = require("mongoose").model("User");
const jwt = require("jsonwebtoken");
const authSettings = require("../config/auth");

module.exports = async (req, res, next) => {
    const authHeader = req.headers[authSettings.key]
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, authSettings.secret);
        return await User.findOne({ _id: decoded._id })
            .then(user => {
                req.user = user;
                next();
            });
    } catch (err) {
        console.log(err);
        res.sendStatus(403)
    }
};