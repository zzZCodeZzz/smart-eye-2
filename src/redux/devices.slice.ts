import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Device} from "./device.types";

type DevicesState = {
    activeDevice: string | null;
    devices: {
        [device_id: string]: Device;
    };
}

const initialState: DevicesState = {
    activeDevice: null,
    devices: {}
};

const devicesSlice = createSlice({
    name: "devices",
    initialState,
    reducers: {
        onDevicesReceived(state, action: PayloadAction<any[]>) {
            state.devices = action.payload
                .map(device => {
                    if (!device.serial_number || device.serial_number.replace(/[^0-9SNC]/g, "").length) {
                        return {...device, serial_number: "00000"}
                    }
                    return device;
                }).reduce((acc, curr) => ({...acc, [curr.device_id]: curr}), {});

            if (!state.activeDevice) {
                state.activeDevice = action.payload[0] ? action.payload[0].device_id : null;
            }
        }
    }
});

export const {onDevicesReceived} = devicesSlice.actions;

export default devicesSlice.reducer;
