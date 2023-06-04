module.exports = class UserDto {
    id
    login
    role
    email
    phone
    coach
    constructor(model) {
        this.id = model._id
        this.login = model.login
        this.role = model.role
        this.email = model.email
        this.phone = model.phone
        this.coach = model.coach
    }
}

