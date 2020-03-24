import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import i18n from "i18next";

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
    dictionary: {
        ready: boolean;
        dictionary: Dictionary
    }
};

export type Dictionary = {
    [key: string]: {
        de: string,
        en: string
    }
}

const initialState: AppState = {
    settings: null,
    dictionary: {
        ready: false,
        dictionary: {}
    }
};

const appSlice = createSlice({
    name: "settings",
    initialState: initialState,
    reducers: {
        onSettingsReceived(state, action: PayloadAction<AppSettings>) {
            state.settings = action.payload;
        },
        onDictionaryReceived(state, action: PayloadAction<Dictionary>) {

            // transforms dictionary shape from api to dictionary shape from i18n
            const i18nDictionary = Object.entries(action.payload).reduce((acc: any, [wordKey, translations]) => {
                Object.entries(translations).forEach(([language, value]) => {
                    if (!acc[language]) acc[language] = {};
                    acc[language][wordKey] = value
                });
                return acc;
            }, {});

            // adds new translations
            Object.entries(i18nDictionary).forEach(([language, translations]) => {
                i18n.addResources(language, "translation", translations);
            });
            state.dictionary.ready = true;
            state.dictionary.dictionary = action.payload;
        }
    }
});

export const {onSettingsReceived, onDictionaryReceived} = appSlice.actions;

export default appSlice.reducer;
