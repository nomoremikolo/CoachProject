import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    users: [],
    foundedUsers: [],
    user: null,
    errors: null,
    isLoading: false
}

export const usersSlice = createSlice({
    name: "usersReducer",
    initialState: initialState,
    reducers: {
        GET_USERS(state){
            state.isLoading = true
        },
        GET_USERS_SUCCESS(state, payload){
            state.isLoading = false
            state.errors = null
            state.users = payload.payload
        },
        GET_USERS_ERROR(state, payload){
            state.isLoading = false
            state.errors = payload.payload
        },
        CREATE_USER(state){
            state.isLoading = true
        },
        CREATE_USER_SUCCESS(state){
            state.isLoading = false
            state.errors = null
        },
        CREATE_USER_ERROR(state, payload){
            state.isLoading = false
            state.errors = payload.payload
        },
        GET_USER_BY_ID(state){
            state.isLoading = true
        },
        GET_USER_BY_ID_SUCCESS(state, payload){
            state.isLoading = false
            state.errors = null
            state.user = payload.payload
        },
        GET_USER_BY_ID_ERROR(state, payload){
            state.isLoading = false
            state.errors = payload.payload
        },
        UPDATE_USER(state){
            state.isLoading = true
        },
        UPDATE_USER_SUCCESS(state){
            state.isLoading = false
            state.user = null
            state.errors = null
        },
        UPDATE_USER_ERROR(state, payload){
            state.isLoading = false
            state.errors = payload.payload
        },
        DELETE_USER(state){
          state.isLoading = true
        },
        DELETE_USER_SUCCESS(state){
            state.isLoading = false
            state.errors = null
        },
        DELETE_USER_ERROR(state, payload){
            state.isLoading = false
            state.errors = payload.payload
        },
        GET_USER_BY_LOGIN(state){
        },
        GET_USER_BY_LOGIN_SUCCESS(state, payload){
            state.foundedUsers = payload.payload
            state.errors = null
        },
        GET_USER_BY_LOGIN_ERROR(state, payload){
            state.errors = payload.payload
        },
    }
})

export default usersSlice.reducer