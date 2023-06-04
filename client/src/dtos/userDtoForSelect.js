export class UserDto {
    id
    label
    constructor(model) {
        this.id = model.id
        this.label = model.login
    }
}

