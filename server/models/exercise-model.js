const {Schema, model} = require("mongoose")

const exerciseModel = new Schema({
    schedule: {type: Schema.Types.ObjectId, ref: 'Schedule'},
    time: {type: Number, require: true},
    day: {type: Number, require: true},
    title: {type: String, require: true},
    description: {type: String}
})

module.exports = model('Exercise', exerciseModel)