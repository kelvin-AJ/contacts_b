const routes = require("express").Router();
const controller = require("../controllers")

routes.get("/", controller.getAll);
routes.get("/:id", controller.getSingle);
routes.post("/", controller.addContact);
routes.put("/:id", controller.updateContact);
routes.delete("/:id", controller.deleteContact);



module.exports = routes;