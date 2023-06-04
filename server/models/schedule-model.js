const {Schema, model} = require("mongoose")

const scheduleSchema = new Schema({
    coach: {type: Schema.Types.ObjectId, ref: 'User'},
    weekStart: {type: Date, require: true},
    weekEnd: {type: Date, require: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('Schedule', scheduleSchema)