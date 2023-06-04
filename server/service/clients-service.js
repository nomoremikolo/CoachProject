const UserModel = require("../models/user-model")
const UserForCoachDto = require("../dtos/user-for-coach-dto");

class ClientsService{
    async getClients(coachId){
        const clients = await UserModel.find({coach: coachId})
        let result = []
        for (let i in clients){
            let user = new UserForCoachDto(clients[i])
            result.push(user)
        }
        return result
    }
}
module.exports = new ClientsService()