import axios from "axios";
import {authSlice} from "../reducers/auth-slice"
import $api from "../../http";

export const login = (login, password) => async (dispatch) => {
    try {
        dispatch(authSlice.actions.LOGIN)
        const response = await $api.post('/login', {
            login,
            password
        }).then(r => {
            localStorage.setItem('token', r.data.accessToken)
            dispatch(authSlice.actions.LOGIN_SUCCESS(r.data.user))
        })
        return true
    }catch (e) {
        console.log(e)
        dispatch(authSlice.actions.LOGIN_ERROR(e.response.data.message ?? null))
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch(authSlice.actions.LOGOUT)
        const response = await $api.post('/logout')
        localStorage.removeItem('token')
        dispatch(authSlice.actions.LOGOUT_SUCCESS())
    }catch (e) {
        dispatch(authSlice.actions.LOGOUT_ERROR(e.message))
    }
}

export const checkAuth = () => async (dispatch) => {
    try {
        dispatch(authSlice.actions.CHECK_AUTH)
        await axios.get(`${process.env.REACT_APP_API_URL}/refresh`, {withCredentials: true}).then(r => {
            localStorage.setItem('token', r.data.accessToken)
            dispatch(authSlice.actions.CHECK_AUTH_SUCCESS(r.data.user))
        })

    }catch (e) {
        dispatch(authSlice.actions.CHECK_AUTH_ERROR(e.message))
    }
}

export const changeData = (data) => async (dispatch) => {
    try {
        dispatch(authSlice.actions.CHANGE_DATA())
        await $api.put(`/me`, {
            data
        }).then(r => {
            dispatch(authSlice.actions.CHANGE_DATA_SUCCESS(r.data))
        })
        return {
            isOk: true,
        }
    }catch (e) {
        dispatch(authSlice.actions.CHANGE_DATA_ERROR(e.message))
        return {
            isOk: false,
        }
    }
}