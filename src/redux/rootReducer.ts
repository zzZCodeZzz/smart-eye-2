import {combineReducers} from '@reduxjs/toolkit'
import radEyeDevicesSlice from "./device/radEyeDevicesSlice";
import settingsSlice from "./settings/settingsSlice";
import gatewaySlice from "./gateway/gatewaySlice";

console.log("reducer",radEyeDevicesSlice);
const rootReducer = combineReducers({
    radEyeDevices: radEyeDevicesSlice,
    app: settingsSlice,
    gateways: gatewaySlice
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

