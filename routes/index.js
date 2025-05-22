const routes = require("express").Router();
const controller = require("../controllers")
const contacts = require("./contacts")


routes.get("/", (req, res) => {
    res.send("Welcome to my contacts app 🤗")
})
routes.use("/contacts", contacts)


module.exports = routes;