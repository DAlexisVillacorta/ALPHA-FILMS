const express = require("express")
const usersController = require("../controllers/usersController")
const validateUser = require("../middlewares/validateUsers")

const routerUsers = express.Router()

routerUsers.get('/users/:id', validateUser, usersController)

module.exports = routerUsers