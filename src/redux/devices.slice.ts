import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Device} from "./device.types";
import {AppThunk} from "./store";
import {MQTTsendDevice} from "../mqtt/mqttClient";

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
        setActiveDevice(state, action: PayloadAction<string>) {
            state.activeDevice = action.payload;
        },
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
        },
        updateDevice(state, action: PayloadAction<Device>) {
            state.devices[action.payload.device_id] = action.payload;
        }
    }
});

export const {onDevicesReceived, updateDevice} = devicesSlice.actions;

export default devicesSlice.reducer;

export const updateDeviceLocalAndRemote = (fieldName: string, value: string): AppThunk => async (dispatch, getState) => {

    const {devices} = getState();

    if (!devices.activeDevice) {
        alert("no device active");
        return;
    }

    const alteredDevice: Device = {...devices.devices[devices.activeDevice], [fieldName]: value};

    MQTTsendDevice(alteredDevice);

    dispatch(updateDevice(alteredDevice))
};
