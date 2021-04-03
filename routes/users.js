let express = require('express');
let router = express.Router();
const userController = require("../controllers/user");

router.post("/register", userController.register);

router.post("/login", userController.login);

// router.get('/logout', function (req, res, next) {
//     req.logout();
//     return res.status(200).json({ message: 'Logout Success' });
// })


module.exports = router;
