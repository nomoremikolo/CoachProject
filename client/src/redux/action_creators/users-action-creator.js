import {usersSlice} from "../reducers/users-slice"
import $api from "../../http";
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch(usersSlice.actions.GET_USERS())
        await $api.get("/users").then(r => {
            dispatch(usersSlice.actions.GET_USERS_SUCCESS(r.data))
        })
    }catch (e) {
        dispatch(usersSlice.actions.GET_USERS_ERROR(e.response.data.message ?? "Не передбачувана помилка"))
    }
}

export const createUser = (login, password, role, email, phone, coachId) => async (dispatch) => {
    try {
        dispatch(usersSlice.actions.CREATE_USER())
        await $api.post('/create-user', {
            "login": login,
            "password": password,
            "role": role,
            "email": email,
            "phone": phone,
            "coach": coachId,
        }).then(r => {
            dispatch(usersSlice.actions.CREATE_USER_SUCCESS())
        })
        return true
    }catch (e) {
        dispatch(usersSlice.actions.GET_USERS_ERROR(e.response.data.message ?? "Не передбачувана помилка"))
    }
}

export const getUserById = (id) => async (dispatch) => {
    dispatch(usersSlice.actions.GET_USER_BY_ID())
    try {
         await $api.get(`/user/${id}`).then(r => {
            dispatch(usersSlice.actions.GET_USER_BY_ID_SUCCESS(r.data))
            return r.data
        })

    }catch (e) {
        dispatch(usersSlice.actions.GET_USER_BY_ID_ERROR(e.response.data.message ?? "Не передбачувана помилка"))
    }
}

export const updateUserById = (data) => async (dispatch) => {
    dispatch(usersSlice.actions.UPDATE_USER())
    try {
        await $api.put('/user/', {
            "id": data.id,
            "login": data.login,
            "role": data.role,
            "email": data.email,
            "phone": data.phone,
            "coach": data.coach
        }).then(r => {
            dispatch(usersSlice.actions.UPDATE_USER_SUCCESS())
        })
        return true
    }catch (e) {
        dispatch(usersSlice.actions.UPDATE_USER_ERROR())
    }
}

export const deleteUserById = (id) => async (dispatch) => {
    dispatch(usersSlice.actions.DELETE_USER())
    try {
        $api.delete(`/users/${id}`).then(r => {
            dispatch(usersSlice.actions.DELETE_USER_SUCCESS())
        })
    }catch (e) {
        dispatch(usersSlice.actions.DELETE_USER_ERROR(e.response.data.message))
    }
}

export const getCoachesByLogin = (login) => async (dispatch) => {
    dispatch(usersSlice.actions.GET_USER_BY_LOGIN())
    try {
        await $api.get(`/findUserByLogin/${login}`).then(r => {
            dispatch(usersSlice.actions.GET_USER_BY_LOGIN_SUCCESS(r.data))
        })

    }catch (e) {
        dispatch(usersSlice.actions.GET_USER_BY_LOGIN_ERROR(e.response.data.message))
    }
}

export const getUsersByLogin = (login) => async (dispatch) => {
    dispatch(usersSlice.actions.GET_USERS())
    try {
        await $api.get(`/findUserByLogin/${login}`).then(r => {
            dispatch(usersSlice.actions.GET_USERS_SUCCESS(r.data))
        })

    }catch (e) {
        dispatch(usersSlice.actions.GET_USERS_ERROR(e.response.data.message))
    }
}