const Router = require('express').Router
const authController = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-middleware")
const router = new Router()

router.get('/me',authMiddleware, authController.getSelfInfo)
router.put('/me',authMiddleware, authController.updateSelfInfo)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/refresh', authController.refresh)

module.exports = router
