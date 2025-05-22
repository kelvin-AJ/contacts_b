const routes = require("express").Router();
const contacts = require("./contacts");
const swaggerUi = require("swagger-ui-express");

const swaggerJSON = require("../swagger/swagger.json")



routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerJSON));
routes.get("/", (req, res) => {
    res.send("Welcome to my contacts app 🤗")
})
routes.use("/contacts", contacts)


module.exports = routes;