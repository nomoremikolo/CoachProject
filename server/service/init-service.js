const UserModel = require("../models/user-model")
const bcrypt = require("bcrypt");
class InitService{
    async Init(){
        const users = await UserModel.find()
        if (users.length < 1){
            const hashPassword = await bcrypt.hash("root", 3)
            const user = await UserModel.create({login: "root", password: hashPassword, role: 2, email: "root@mail.com", phone: "12345678", coach: null})
        }
        return
    }
}

module.exports = new InitService()