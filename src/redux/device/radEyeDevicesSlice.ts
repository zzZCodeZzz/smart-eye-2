import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Device} from "./device.types";
import {AppThunk} from "../store";
import {MQTTsendDevice} from "../../mqtt/mqttClient";

type DevicesState = {
    activeDevice: string | null;
    activeDeviceHistory?: any;
    devices: {
        [device_id: string]: Device;
    } | null;
}

const initialState: DevicesState = {
    activeDevice: null,
    devices: null
};

const radEyeDevicesSlice = createSlice({
    name: "radEyeDevices",
    initialState,
    reducers: {
        setActiveDevice(state, action: PayloadAction<string>) {
            state.activeDevice = action.payload;
        },
        onDevicesReceived(state, action: PayloadAction<any[]>) {
            state.devices = action.payload
                .map(device => {
                    if (!device.serial_number || device.serial_number.replace(/[^0-9SNC]/g, "").length === 0) {
                        return {...device, serial_number: "00000"}
                    }
                    return device;
                }).reduce((acc, curr) => ({...acc, [curr.device_id]: curr}), {});

            if (!state.activeDevice) {
                state.activeDevice = action.payload[0] ? action.payload[0].device_id : null;
            }
        },
        updateDevice(state, action: PayloadAction<Device>) {
            if (!state.devices) state.devices = {};
            state.devices[action.payload.device_id] = action.payload;
        }
    }
});

export const updateDeviceLocalAndRemote = (fieldName: string, value: string): AppThunk => async (dispatch, getState) => {
    const {radEyeDevices} = getState();
    if (!radEyeDevices.activeDevice) {
        alert("no device active");
        return;
    }
    const alteredDevice: Device = {...radEyeDevices?.devices![radEyeDevices.activeDevice], [fieldName]: value};
    MQTTsendDevice(alteredDevice);
    dispatch(updateDevice(alteredDevice));
};

export const {onDevicesReceived, updateDevice, setActiveDevice} = radEyeDevicesSlice.actions;

export default radEyeDevicesSlice.reducer;
