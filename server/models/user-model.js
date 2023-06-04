const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    login: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    role: {type: Number, require: true, default: 0},
    email: {type: String, require: true},
    phone: {type: String, require: true},
    coach: {type: Schema.Types.ObjectId, ref: 'User', default: null},
})

module.exports = model('User', userSchema)