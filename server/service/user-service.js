const UserModel = require('../models/user-model')
const ScheduleModel = require('../models/schedule-model')
const TokenModel = require('../models/token-model')
const bcrypt = require('bcrypt')
const tokenService = require('./token-service')
const UserDto = require("../dtos/user-dto")
const ApiError = require("../exeptions/api-errors")

class UserService {
    async createUser(login, password, role = 0, email, phone, coach) {
        const loginCheck = await UserModel.findOne({login})
        if (loginCheck){
            if (loginCheck.login === login) {
                throw ApiError.BadRequest('Користувача з таким логіном вже створено')
            }
        }
        const emailCheck = await UserModel.findOne({email})
        if (emailCheck){
            if (emailCheck.email === email) {
                throw ApiError.BadRequest('Користувача з такою поштою вже створено')
            }
        }
        const phoneCheck = await UserModel.findOne({phone})
        if (phoneCheck){
            if (phoneCheck.phone === phone) {
                throw ApiError.BadRequest('Користувача з таким номером вже створено')
            }
        }
        if(coach){
            const coachCandidate = await UserModel.findOne({_id: coach})
            if (!coachCandidate){
                throw ApiError.BadRequest("Тренер не знайдений")
            }
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const user = await UserModel.create({login, password: hashPassword, role, email, phone, coach})
        const userDto = new UserDto(user)
        return {
            user: userDto
        }
    }

    async getAllUsers() {
        const users = await UserModel.find()
        let result = []
        for (let i in users){
            let user = new UserDto(users[i])
            if (user.coach != null)
                user.coach = await this.getInfoById(user.coach)
            result.push(user)
        }
        return result
    }

    async updateUser(req) {
        const user = await UserModel.findOne({_id: req.body.id})
        if (!user)
            throw ApiError.BadRequest()

        const fields = ["email", 'phone', 'password', 'role', 'coach']
        fields.forEach(item => {
            if (req.body[item])
                user[item] = req.body[item]
        })
        await user.save()
        return user
    }

    async getInfoById(id){
        const user = await UserModel.findOne({_id: id})
        if (!user)
            throw ApiError.BadRequest("Такого користувача не існує")
        const userDto = new UserDto(user)
        if (user.coach != null){
            userDto.coach = await this.getInfoById(user.coach)
        }
        return userDto
    }

    async deleteUserById(id){
        const user = await UserModel.findOne({_id: id})
        if (!user)
            throw ApiError.BadRequest("Такого користувача не існує")
        await UserModel.deleteOne({_id: id})
        await UserModel.updateMany({coach: id}, {$set: {coach: null}})
        await ScheduleModel.updateMany({coach: id}, {$set: {coach: null}})
        await TokenModel.deleteOne({user: id})

        const userDto = new UserDto(user)
        return userDto
    }

    async findByLogin(candidate){
        const users = await UserModel.find({login: new RegExp(`${candidate}`)})
        let result = []
        for (let i in users){
            result.push(new UserDto(users[i]))
        }
        return result
    }
}

module.exports = new UserService()