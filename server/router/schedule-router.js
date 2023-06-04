const Router = require('express').Router
const authMiddleware = require("../middlewares/auth-middleware")
const scheduleController = require("../controllers/schedule-controller")
const router = new Router()

router.get('/exercises/', authMiddleware, scheduleController.getExercisesToday)
router.get('/schedule/:id',authMiddleware, scheduleController.getSchedule)
router.get('/schedules/:id?',authMiddleware, scheduleController.getSchedules)
router.post('/schedules',authMiddleware, scheduleController.createSchedule)
router.post('/schedule/',authMiddleware, scheduleController.createExercise)
router.delete("/schedule/:exerciseId", authMiddleware, scheduleController.deleteExercise)
router.delete("/schedules/:scheduleId", authMiddleware, scheduleController.deleteSchedule)
module.exports = router
