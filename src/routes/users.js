const Router = require("express").Router();
const usersController = require("../controllers/users");

Router.get("/getusers", usersController.getUsers);

Router.post("/createUsers", usersController.createUsers);

Router.get("/getusersById/:userId", usersController.getUsersById);

Router.put("/updateUsersById/:userId", usersController.updateUsersById);

Router.delete("/deleteUsersById/:userId", usersController.deleteUsersById);

module.exports = Router;