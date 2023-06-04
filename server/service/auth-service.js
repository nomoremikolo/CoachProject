const UserModel = require("../models/user-model");
const ApiError = require("../exeptions/api-errors");
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/user-dto");
const tokenService = require("./token-service");

class AuthService{
    async login(login, password) {
        const user = await UserModel.findOne({login})
        if (!user)
            throw ApiError.BadRequest("Не правильний логін або пароль")

        const isPasswordEqual = await bcrypt.compare(password, user.password)
        if (!isPasswordEqual)
            throw ApiError.BadRequest("Не правильний логін або пароль")

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken){
        if(!refreshToken)
            throw ApiError.UnauthorizedError()

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb)
            throw ApiError.UnauthorizedError()

        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto
        }
    }

    async updateSelf(req){
        const id = req.user.id
        const user = await UserModel.findOne({_id: id})
        const fields = ["email", 'phone', 'role']
        const reqData = req.body.data
        if(reqData["password"] && reqData["password2"] && reqData["oldPassword"]){
            console.log("Паролі є")
            if (reqData["password"] !== reqData["password2"]){
                console.log("Паролі не сходяться")
                throw ApiError.BadRequest("Паролі не сходяться")
            }else{
                console.log("Паролі сходяться")
                if (reqData['oldPassword']) {
                    const isPasswordEqual = await bcrypt.compare(reqData['oldPassword'], user.password)
                    if (!isPasswordEqual) {
                        throw ApiError.BadRequest("Не правильний пароль")
                    } else {
                        const hashPassword = await bcrypt.hash(reqData["password"], 3)
                        user['password'] = hashPassword
                    }
                }
            }
        }
        fields.forEach(item => {
            if (reqData[item])
                user[item] = reqData[item]
        })
        await user.save()
        return user
    }
}

module.exports = new AuthService()