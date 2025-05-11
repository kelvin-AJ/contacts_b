const routes = require("express").Router();

routes.get("/test", (req, res) => {
    res.send("We're on!")
})


module.exports = routes;