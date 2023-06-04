import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: null,
    isLoading: false,
    error: null
}

export const authSlice = createSlice({
    name: "authReducer",
    initialState: initialState,
    reducers: {
        LOGIN(state){
            state.isLoading = true
        },
        LOGIN_SUCCESS(state, payload){
            state.isLoading = false
            state.error = null
            state.isAuth = true
            state.user = payload.payload
        },
        LOGIN_ERROR(state, payload){
            state.isLoading = false
            state.error = payload.payload
            state.isAuth = false
        },
        LOGOUT(state){
            state.isLoading = true
        },
        LOGOUT_SUCCESS(state){
            state.isLoading = false
            state.error = null
            state.isAuth = false
            state.user = null
        },
        LOGOUT_ERROR(state, payload){
            state.isLoading = false
            state.error = payload.payload
        },
        CHECK_AUTH(state){
            state.isLoading = true
        },
        CHECK_AUTH_SUCCESS(state, payload){
            state.isLoading = false
            state.isAuth = true
            state.user = payload.payload
        },
        CHECK_AUTH_ERROR(state){
            state.isLoading = false
        },
        CHANGE_DATA(state){
            state.isLoading = true
        },
        CHANGE_DATA_SUCCESS(state, payload){
            state.isLoading = false
            state.error = null
            state.user = payload.payload
        },
        CHANGE_DATA_ERROR(state, payload){
            state.error = payload
            state.isLoading = false
        },

    }
})

export default authSlice.reducer