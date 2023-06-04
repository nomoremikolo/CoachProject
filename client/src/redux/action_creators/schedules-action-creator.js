import {schedulesSlice} from "../reducers/schedules-slice"
import $api from "../../http/index"

export const getUserSchedules = (userId) => async (dispatch) => {
    dispatch(schedulesSlice.actions.GET_USER_SCHEDULES())
    try {
        await $api.get(`/schedules/${userId}`).then(r => {
            dispatch(schedulesSlice.actions.GET_USER_SCHEDULES_SUCCESS(r.data))
        })

    }catch (e) {
        dispatch(schedulesSlice.actions.GET_USER_SCHEDULES_ERROR())
    }
}

export const createSchedule = (weekStart, weekEnd, userId) => async (dispatch) => {
    dispatch(schedulesSlice.actions.CREATE_SCHEDULE())
    try {
        await $api.post(`/schedules/`, {
            "weekStart": weekStart,
            "weekEnd": weekEnd,
            "userId": userId
        }).then(r => {
            dispatch(schedulesSlice.actions.CREATE_SCHEDULE_SUCCESS())
        })
        return true
    }catch (e) {
        dispatch(schedulesSlice.actions.CREATE_SCHEDULE_ERROR(e.response.data.message ?? "Не передбачена помилка"))
    }
}

export const getExercises = (scheduleId) => async (dispatch) => {
    dispatch(schedulesSlice.actions.GET_EXERCISES())
    try {
        await $api.get(`schedule/${scheduleId}`).then(r => {
            dispatch(schedulesSlice.actions.GET_EXERCISES_SUCCESS(r.data))
        })
        return true
    }catch (e) {
        dispatch(schedulesSlice.actions.GET_EXERCISES_ERROR())
    }
}

export const getSchedule = () => async (dispatch) => {
    dispatch(schedulesSlice.actions.GET_SCHEDULE())
    try {
        await $api.get(`schedules/`).then(r => {
            dispatch(schedulesSlice.actions.GET_SCHEDULE_SUCCESS(r.data))
        })
        return true
    }catch (e) {
        dispatch(schedulesSlice.actions.GET_SCHEDULE_ERROR())
    }
}

export const createExercise = (scheduleId, time, day, title, description) => async (dispatch) => {
    dispatch(schedulesSlice.actions.ADD_EXERCISE())
    try {
        await $api.post(`/schedule/`, {
            "scheduleId": scheduleId,
            "time": time,
            "day": day,
            "title": title,
            "description": description,
        }).then(r => {
            dispatch(schedulesSlice.actions.ADD_EXERCISE_SUCCESS())
        })
        return true
    }catch (e) {
        dispatch(schedulesSlice.actions.ADD_EXERCISE_ERROR())
    }
}

export const deleteExercise = (id) => async (dispatch) => {
    dispatch(schedulesSlice.actions.DELETE_EXERCISE())
    try {
        await $api.delete(`/schedule/${id}`).then(r => {
            dispatch(schedulesSlice.actions.DELETE_EXERCISE_SUCCESS())
        })
        return true
    }catch (e) {
        dispatch(schedulesSlice.actions.DELETE_EXERCISE_ERROR())
    }
}

export const deleteSchedule = (id) => async (dispatch) => {
    dispatch(schedulesSlice.actions.DELETE_SCHEDULE())
    try {
        await $api.delete(`/schedules/${id}`).then(r => {
            dispatch(schedulesSlice.actions.DELETE_SCHEDULE_SUCCESS())
        })
        return true
    }catch (e) {
        dispatch(schedulesSlice.actions.DELETE_SCHEDULE_ERROR())
    }
}