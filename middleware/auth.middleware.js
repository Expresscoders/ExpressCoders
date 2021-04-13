const config = require("../config/app.config");

const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, config.APP_SECRET, (err, user) => {
    console.log(user);

    if (err) return res.sendStatus(403)

    req.user = user.payload;

    next()
  })
}