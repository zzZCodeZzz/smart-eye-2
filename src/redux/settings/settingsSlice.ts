import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type AppSettings = {
    interval: number;
    cyclic_update: string,
    query_infodata: string,
    query_measurements: string,
    query_configuration_1: string,
    query_configuration_2: string,
    verbose: string,
    log_to_mqtt: string
} | null;

type AppState = {
    settings: AppSettings
};

const initialState: AppState = {
    settings: null
};

const appSlice = createSlice({
    name: "settings",
    initialState: initialState,
    reducers: {
        onSettingsReceived(state, action: PayloadAction<AppSettings>) {
            state.settings = action.payload;
        }
    }
});

export const {onSettingsReceived} = appSlice.actions;

export default appSlice.reducer;
