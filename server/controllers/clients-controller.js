const ApiError = require("../exeptions/api-errors")
const clientsService = require("../service/clients-service")
class ClientsController{
    async getClients(req, res, next){
        try {
            if (req.user.role !== 1)
                throw ApiError.MethodNotAllowed("Помилка, ви не є тренер")

            const r = await clientsService.getClients(req.user.id)
            return res.json(r)
        }catch (e) {
            next(e)
        }
    }
}

module.exports = new ClientsController()