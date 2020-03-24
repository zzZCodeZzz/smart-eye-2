import {combineReducers} from '@reduxjs/toolkit'
import devicesSlice from "./device/devicesSlice";
import settingsSlice from "./settings/settingsSlice";
import gatewaySlice from "./gateway/gatewaySlice";

const rootReducer = combineReducers({
    devices: devicesSlice,
    app: settingsSlice,
    gateways: gatewaySlice
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

