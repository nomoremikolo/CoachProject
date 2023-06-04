const userService = require('../service/user-service')
const {validationResult} = require('express-validator')
const ApiError = require("../exeptions/api-errors")

class UserController {
    async createUser(req, res, next) {
        try {
            if (req.user.role !== 2)
                throw ApiError.Forbidden()

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Помилка при створенні користувача", errors.array()))
            }
            const {login, password, role, email, phone, coach} = req.body
            const userData = await userService.createUser(login, password, role, email, phone, coach)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getAllUsers(req, res, next) {
        try {
            if (req.user.role !== 2)
                throw ApiError.Forbidden()

            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }

    async getUserById(req, res, next){
        try {
            const user = await userService.getInfoById(req.params.id)
            return res.json(user)
        }catch (e) {
            next(e)
        }
    }

    async updateUser(req, res, next) {
        try {
            if (req.user.role !== 2)
                throw ApiError.Forbidden()

            if (req.body.id === req.user.id)
                throw ApiError.MethodNotAllowed()

            const userData = await userService.updateUser(req)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async deleteUserById(req, res, next){
        try {
            if (req.user.role !== 2)
                throw ApiError.Forbidden()

            if (req.body.id === req.user.id)
                throw ApiError.MethodNotAllowed()

            const userData = await userService.deleteUserById(req.params.id)
        }catch (e) {
            next(e)
        }
    }

    async findByLogin(req, res, next){
        try {
            const candidate = req.params.login
            if (!candidate)
                throw ApiError.BadRequest("Ви не вказали логін")

            const userData = await userService.findByLogin(candidate)

            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()