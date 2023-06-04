module.exports = class UserForCoachDto {
    id
    login
    role
    email
    phone
    constructor(model) {
        this.id = model._id
        this.login = model.login
        this.role = model.role
        this.email = model.email
        this.phone = model.phone
    }
}

