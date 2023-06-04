import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/auth-slice"
import usersReducer from "./reducers/users-slice"
import clientsReducer from "./reducers/clients-slice"
import schedulesReducer from "./reducers/schedules-slice";

const rootReducer = combineReducers({
    authReducer,
    usersReducer,
    clientsReducer,
    schedulesReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}
