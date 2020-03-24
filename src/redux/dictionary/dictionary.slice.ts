import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type DictionaryEntry = {
    de: string,
    en: string
};

type DictionaryState = { [key: string]: DictionaryEntry } | null;

const initialState: DictionaryState = null;

const dictionarySlice = createSlice({
    name: "dictionary",
    initialState,
    reducers: {
        onDictionaryReceived(state, action: PayloadAction<DictionaryState>) {
            // state = action.payload
        }
    }

})
