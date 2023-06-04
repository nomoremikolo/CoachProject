const ScheduleModel = require("../models/schedule-model")
const ExercisesModel = require("../models/exercise-model")
const ApiError = require("../exeptions/api-errors")
class ScheduleService{
    async createSchedule(req){
        const body = req.body
        if (new Date(body.weekStart).getTime() > new Date(body.weekEnd).getTime())
            throw ApiError.BadRequest("Кінець тижня не може бути раніше ніж початок")
        const result = await ScheduleModel.create({coach: req.user.id, weekStart: new Date(body.weekStart).toISOString(), weekEnd: new Date(body.weekEnd).toISOString(), user: body.userId})
        return result
    }
    async getSchedule(scheduleId){
        const exercises = await ExercisesModel.find({schedule: scheduleId})
        return exercises
    }

    async createExercise(req){
        const {scheduleId, time, title, description, day} = req.body
        const result = await ExercisesModel.create({schedule: scheduleId, time: time, day: day, title: title, description: description})
        return result
    }

    async getSchedules(userId){
        const schedules = await ScheduleModel.find({user: userId})
        return schedules
    }

    async deleteExercise(exerciseId) {
        const exercise = await ExercisesModel.findOne({_id: exerciseId})

        if (!exercise)
            throw ApiError.BadRequest("Вправа не знайдена")

        const r = await ExercisesModel.deleteOne({_id: exerciseId})
        return r
    }

    async deleteSchedule(scheduleId){
        const schedule = await ScheduleModel.findOne({_id: scheduleId})
        if (!schedule)
            throw ApiError.BadRequest("Розклад не знайдено")

        const r = await ScheduleModel.deleteOne({_id: scheduleId})
        await ExercisesModel.deleteMany({schedule: scheduleId})
        return r
    }

    async getExercisesToday(userId){
        const today = new Date()
        const day = today.getDay()
        const dayMilliseconds = (24*60*60*1000)*(day-1);
        let weekStart = new Date(today.setTime(today.getTime() - dayMilliseconds))
        const res = weekStart.toLocaleDateString("af-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
        const schedule = await ScheduleModel.find({
            weekStart: new Date(res),
            user: userId
        })
        const exercises = await ExercisesModel.find({schedule: schedule, day: new Date().getDay()-1})
        return exercises
    }
}
module.exports = new ScheduleService()