import { combineReducers } from '@reduxjs/toolkit'
import devicesSlice from "./devices.slice";
import settingsSlice from "./settings.slice";
import gatewaySlice from "./gateway.slice";

const rootReducer = combineReducers({
    devices: devicesSlice,
    app: settingsSlice,
    gateways: gatewaySlice
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

