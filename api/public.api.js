const express = require("express");
let router = express.Router();

router.get("/survey/list/", (req, res, next) => {
    res.send({
        "Hello": "World!"
    });
})


module.exports = router;