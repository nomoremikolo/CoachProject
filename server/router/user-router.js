const Router = require('express').Router
const {body} = require("express-validator")
const authMiddleware = require('../middlewares/auth-middleware')
const userController = require("../controllers/user-controller");
const router = new Router()

router.post('/create-user',
    body('email').isEmail(),
    body('password').isLength({min: 8}),
    authMiddleware,
    userController.createUser,
)
router.get('/users',authMiddleware, userController.getAllUsers)
router.delete('/users/:id',authMiddleware, userController.deleteUserById)
router.get('/user/:id',authMiddleware, userController.getUserById)
router.put('/user/',
    body('email').isEmail(),
    body('password').isLength({min: 8}),
    authMiddleware, userController.updateUser)
router.get("/findUserByLogin/:login", authMiddleware, userController.findByLogin)

module.exports = router