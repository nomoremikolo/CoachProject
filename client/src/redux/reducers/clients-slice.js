import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    clients: [],
    errors: null,
    isLoading: true,
}

export const clientsSlice = createSlice({
    name: "clientsReducer",
    initialState: initialState,
    reducers: {
        GET_CLIENTS(state){
            state.isLoading = true
        },
        GET_CLIENTS_SUCCESS(state, payload){
            state.isLoading = false
            state.clients = payload.payload
            state.errors = null
        },
        GET_CLIENTS_ERROR(state, payload){
            state.isLoading = false
            state.errors = payload.payload
        },
    }
})

export default clientsSlice.reducer