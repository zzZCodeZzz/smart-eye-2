import { combineReducers } from '@reduxjs/toolkit'
import devicesSlice from "./devices.slice";
import settingsSlice from "./settings.slice";

const rootReducer = combineReducers({
    devices: devicesSlice,
    app: settingsSlice
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

