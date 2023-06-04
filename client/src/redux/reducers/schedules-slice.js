import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    schedules: [],
    exercises: [],
    errors: null,
    isLoading: false
}

export const schedulesSlice = createSlice({
    name: "schedulesReducer",
    initialState: initialState,
    reducers: {
        GET_USER_SCHEDULES(state){
          state.isLoading = true
        },
        GET_USER_SCHEDULES_SUCCESS(state, payload){
            state.isLoading = false
            state.schedules = payload.payload
            state.errors = null
        },
        GET_USER_SCHEDULES_ERROR(state, payload){
            state.isLoading = false
            state.errors = payload.payload
        },
        CREATE_SCHEDULE(state){
            state.isLoading = true
        },
        CREATE_SCHEDULE_SUCCESS(state){
            state.isLoading = false
            state.errors = null
        },
        CREATE_SCHEDULE_ERROR(state, payload){
            state.isLoading = false
            state.errors = payload.payload
        },
        ADD_EXERCISE(state){
            state.isLoading = true
        },
        ADD_EXERCISE_SUCCESS(state){
            state.isLoading = false
            state.errors = null
        },
        ADD_EXERCISE_ERROR(state, payload){
            state.isLoading = false
            state.errors = payload.payload
        },
        GET_EXERCISES(state){
           state.isLoading = true
        },
        GET_EXERCISES_SUCCESS(state, payload){
            state.isLoading = false
            state.exercises = payload.payload
            state.errors = null
        },
        GET_EXERCISES_ERROR(state, payload){
            state.isLoading = false
            state.errors = payload.payload
        },
        DELETE_EXERCISE(state){
            state.isLoading = true
        },
        DELETE_EXERCISE_SUCCESS(state){
            state.isLoading = false
            state.errors = null
        },
        DELETE_EXERCISE_ERROR(state, payload){
            state.isLoading = false
            state.errors = payload.payload
        },
        DELETE_SCHEDULE(state){
            state.isLoading = true
        },
        DELETE_SCHEDULE_SUCCESS(state){
            state.isLoading = false
            state.errors = null
        },
        DELETE_SCHEDULE_ERROR(state, payload){
            state.isLoading = false
            state.errors = payload.payload
        },
        GET_SCHEDULE(state){
          state.isLoading = true
        },
        GET_SCHEDULE_SUCCESS(state, payload){
            state.isLoading = false
            state.errors = null
            state.schedules = payload.payload
        },
        GET_SCHEDULE_ERROR(state, payload){
            state.isLoading = false
            state.errors = payload.payload
        },
    }
})

export default schedulesSlice.reducer