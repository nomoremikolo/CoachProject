import {clientsSlice} from "../reducers/clients-slice"
import $api from "../../http/index"
export const getClients = () => async (dispatch) => {
    dispatch(clientsSlice.actions.GET_CLIENTS())
    try {
        await $api.get("/clients").then(r => {
            dispatch(clientsSlice.actions.GET_CLIENTS_SUCCESS(r.data))
        })

    }catch (e) {
        dispatch(clientsSlice.actions.GET_CLIENTS_ERROR())
    }
}