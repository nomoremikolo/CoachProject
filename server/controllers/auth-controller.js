const authService = require("../service/auth-service");
const userService = require("../service/user-service");

class AuthController {
    async login(req, res, next) {
        try {
            const {login, password} = req.body
            const userData = await authService.login(login, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await authService.logout(refreshToken);
            res.clearCookie('refreshToken')
            return res.status(200).send()
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await authService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getSelfInfo(req, res, next){
        try {
            const id = req.user.id
            const userData = await userService.getInfoById(id)
            return res.json(userData)
        }catch (e) {
            next()
        }
    }
    
    async updateSelfInfo(req, res, next){
        try {
            const userData = await authService.updateSelf(req)
            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthController()