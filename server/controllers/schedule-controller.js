const {validationResult} = require('express-validator')
const ApiError = require("../exeptions/api-errors")
const scheduleService = require("../service/schedule-service")

class ScheduleController {
    async createSchedule(req, res, next){
        try {
            if (req.user.role !== 1)
                throw ApiError.Forbidden()

            const scheduleData = await scheduleService.createSchedule(req)
            return res.json(scheduleData)
        } catch (e) {
            next(e)
        } 
    }

    async getSchedule(req, res, next){
        try {
            const scheduleId = req.params.id
            const exercises = await scheduleService.getSchedule(scheduleId)

            return res.json(exercises)
        }catch (e) {
            next(e)
        }
        // try {
        //     const scheduleData = await scheduleService.getSchedule(req.user.id)
        //     if (!scheduleData)
        //         throw ApiError.BadRequest("Розкладу не знайдено")
        //     res.json(scheduleData)
        // }catch (e){
        //     next(e)
        // }
    }

    async createExercise(req, res, next){
        try {
            const r = await scheduleService.createExercise(req)
            return res.json(r)
        }catch (e) {
            next(e)
        }
    }

    async getSchedules(req, res, next){
        try {
            let userId = req.params.id

            if (req.user.role === 0){
                if (!userId)
                    userId = req.user.id
                if (userId !== req.user.id)
                    throw ApiError.Forbidden()
            }

            const schedules = await scheduleService.getSchedules(userId)
            return res.json(schedules)
        }catch (e) {
            next(e)
        }
    }

    async deleteExercise(req, res, next){
        try {
            const {exerciseId} = req.params
            if (req.user.role !== 1)
                throw ApiError.MethodNotAllowed()
            const r = await scheduleService.deleteExercise(exerciseId)

            return res.json(r)
        }catch (e) {
            next(e)
        }
    }

    async deleteSchedule(req, res, next){
        try {
            const {scheduleId} = req.params
            if (req.user.role !== 1)
                throw ApiError.MethodNotAllowed()
            const r = await scheduleService.deleteSchedule(scheduleId)

            return res.json(r)
        }catch (e) {
            next(e)
        }
    }

    async getExercisesToday(req, res, next){
        try {
            const r = await scheduleService.getExercisesToday(req.user.id)
            return res.json(r)
        }catch (e) {
            next(e)
        }
    }
}

module.exports = new ScheduleController()