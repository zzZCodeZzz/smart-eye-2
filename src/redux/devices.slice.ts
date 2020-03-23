import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type DevicesState = {
    activeDevice: string;
    devices: any[];
}

const initialState: DevicesState = {
    activeDevice: "device1",
    devices: []
};

const devicesSlice = createSlice({
    name: "devices",
    initialState,
    reducers: {
        onDevicesReceived(state, action: PayloadAction<any>) {
            state.devices = action.payload;
        }
    }
});

export const {onDevicesReceived} = devicesSlice.actions;

export default devicesSlice.reducer;
