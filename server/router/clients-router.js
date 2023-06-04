const Router = require('express').Router
const authMiddleware = require("../middlewares/auth-middleware")
const clientsController = require("../controllers/clients-controller")
const router = new Router()

router.get('/clients',authMiddleware, clientsController.getClients)

module.exports = router
