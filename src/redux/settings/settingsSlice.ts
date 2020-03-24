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
    settings: AppSettings,
    dictionary: Dictionary
};

type Dictionary = {
    [key: string]: {
        de: string,
        en: string
    }
}

const initialState: AppState = {
    settings: null,
    dictionary: {}
};

const appSlice = createSlice({
    name: "settings",
    initialState: initialState,
    reducers: {
        onSettingsReceived(state, action: PayloadAction<AppSettings>) {
            state.settings = action.payload;
        },
        onDictionaryReceived(state, action: PayloadAction<Dictionary>) {
            state.dictionary = action.payload;
        }
    }
});

export const {onSettingsReceived, onDictionaryReceived} = appSlice.actions;

export default appSlice.reducer;
