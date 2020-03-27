import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Device} from "./device.types";
import {AppThunk} from "../store";
import {MQTTsendDevice, MQTTSubscribeHistoryForActiveDevice} from "../../mqtt/mqttClient";
import moment from "moment";
import {useDispatch} from "react-redux";
import React from "react";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";

export type DeviceHistoryEntry = {
    line: string;
    device_id: string;
    time_record_todb: string;
    time_measurestring: string;
    mean_value_activity: string;
    mean_value_count_rate: string;
    max_value_activity: string;
    max_value_count_rate: string;
    mean_value_dose_rate: string;
    max_value_dose_rate: string;
    measuring_time: string;
    temperature: string;
    ratemeter_net_value: string;
    operation_mode_scaler: string;
    background_measurement: string;
    preset_time: string;
    dose_rate_unit: string;
    contamination_bq: string;
}

export type DeviceDoseVisualisation = {
    time: string;
    dose: number;
    dose_rate: number;
    count_rate_gamma: number;
}

type DevicesState = {
    activeDevice: string | null;
    activeDeviceHistory?: DeviceHistoryEntry[];
    activeDeviceDoseVisualisation: DeviceDoseVisualisation[],
    devices: {
        [device_id: string]: Device;
    } | null;
}
const initialState: DevicesState = {
    activeDevice: null,
    devices: null,
    activeDeviceDoseVisualisation: []
};

const radEyeDevicesSlice = createSlice({
    name: "radEyeDevices",
    initialState,
    reducers: {
        setActiveDevice(state, action: PayloadAction<string>) {
            state.activeDevice = action.payload;
            if (state.devices && state.devices[action.payload] && state.devices[action.payload].dose) {
                state.activeDeviceDoseVisualisation = [{
                    time: moment().toISOString(),
                    dose: Number(state.devices[action.payload].dose),
                    dose_rate: Number(state.devices[action.payload].dose_rate),
                    count_rate_gamma: Number(state.devices[action.payload].count_rate_gamma)
                }]
            } else {
                state.activeDeviceDoseVisualisation = [];
            }
        },
        onDevicesReceived(state, action: PayloadAction<Device[]>) {
            state.devices = action.payload
            // Todo remove mock
                .map(device => ({...device, configuration_flags: confFlagsMock}))
                .map(device => {
                    if (!device.serial_number || device.serial_number.replace(/[^0-9SNC]/g, "").length === 0) {
                        return {...device, serial_number: "00000"}
                    }
                    return device;
                }).reduce((acc, curr) => ({...acc, [curr.device_id]: curr}), {});

            if (action.payload[0]) {
                const [firstDevice] = action.payload;
                if (!state.activeDevice) {
                    state.activeDevice = firstDevice.device_id;
                    MQTTSubscribeHistoryForActiveDevice(firstDevice.device_id);

                    if (firstDevice.dose_rate) {
                        state.activeDeviceDoseVisualisation =
                            [...state.activeDeviceDoseVisualisation,
                                {
                                    time: moment().toISOString(),
                                    dose: Number(firstDevice.dose),
                                    dose_rate: Number(firstDevice.dose_rate),
                                    count_rate_gamma: Number(firstDevice.count_rate_gamma)
                                }
                            ]
                    }
                } else {
                    const [activeDevice] = action.payload.filter(device => device.device_id === state.activeDevice);
                    if (activeDevice.dose_rate) {
                        state.activeDeviceDoseVisualisation =
                            [...state.activeDeviceDoseVisualisation,
                                {
                                    time: moment().toISOString(),
                                    dose: Number(activeDevice.dose),
                                    dose_rate: Number(activeDevice.dose_rate),
                                    count_rate_gamma: Number(activeDevice.count_rate_gamma)
                                }
                            ]
                    }
                }
            }
        },
        updateDevice(state, action: PayloadAction<Device>) {
            if (!state.devices) state.devices = {};
            state.devices[action.payload.device_id] = action.payload;
        },
        onDeviceHistoryReceived(state, action: PayloadAction<DeviceHistoryEntry[]>) {
            state.activeDeviceHistory = action.payload;
        }
    }
});

export const setActiveDeviceAndSubscribeHistory = (deviceId: string): AppThunk => async dispatch => {
    dispatch(setActiveDevice(deviceId));
    MQTTSubscribeHistoryForActiveDevice(deviceId);
};

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

export const useUpdateDevice = () => {
    const dispatch = useDispatch();

    const updateSelect = (event: React.ChangeEvent<any>) => dispatch(
        updateDeviceLocalAndRemote(event.target.name, event.target.value)
    );

    const updateSwitch = (event: React.ChangeEvent<HTMLInputElement>) => dispatch(
        updateDeviceLocalAndRemote(event.target.name, event.target.checked ? "1" : "0")
    );

    const updateSlider = (fieldName: string, value: number | number[]) => dispatch(
        updateDeviceLocalAndRemote(fieldName, String(value))
    );

    const updateTime = (fieldName: string, time: MaterialUiPickersDate) => {
        if (time) {
            dispatch(updateDeviceLocalAndRemote(fieldName, time.format("YYYY-MM-DD HH:mm:ss")));
        }
    };

    return {
        updateSelect,
        updateSwitch,
        updateSlider,
        updateTime
    };
};

export const {onDevicesReceived, updateDevice, setActiveDevice, onDeviceHistoryReceived} = radEyeDevicesSlice.actions;

export default radEyeDevicesSlice.reducer;

const confFlagsMock = {
    turbo: {
        options: [
            "off",
            "on"
        ],
        category: "Motor",
        sub_category: "Aktor",
        value: 1
    },
    temperatur: {
        options: [
            "kelvin",
            "fahrenheit",
            "celsius"
        ],
        category: "Motor",
        sub_category: "Sensor",
        value: 2
    },
    temperatur2: {
        options: [
            "kelvin",
            "fahrenheit",
            "celsius"
        ],
        category: "Motor2",
        sub_category: "Sensor",
        value: 2
    },
    temperatur3: {
        options: [
            "kelvin",
            "fahrenheit",
            "celsius"
        ],
        category: "Motor3",
        sub_category: "Sensor",
        value: 2
    },
    temperatur4: {
        options: [
            "kelvin",
            "fahrenheit",
            "celsius"
        ],
        category: "Motor4",
        sub_category: "Sensor",
        value: 2
    },
    sparmodus: {
        options: [
            "off",
            "on"
        ],
        category: "Motor",
        sub_category: "Aktor",
        value: 0
    },
    drehzal: {
        options: [
            "off",
            "on"
        ],
        category: "Motor",
        sub_category: "Sensor",
        value: 1
    },
    geschwindigkeit: {
        options: [
            "kilometer",
            "meilen"
        ],
        category: "Anzeige",
        sub_category: "combi",
        value: 1
    },
    language: {
        options: [
            "englisch",
            "deutsch",
            "französisch",
            "italienisch",
            "spanisch",
            "portugisisch",
            "polnisch"
        ],
        category: "Anzeige",
        sub_category: "Mittelkonsole",
        value: 6
    },
    radio: {
        options: [
            "off",
            "on"
        ],
        category: "Anzeige",
        sub_category: "Mittelkonsole",
        value: 1
    },
    oelstand: {
        options: [
            "off",
            "on"
        ],
        category: "Anzeige",
        sub_category: "combi",
        value: 1
    },
    licht: {
        options: [
            "off",
            "on"
        ],
        category: "Innenraum",
        sub_category: "Beleuchtung",
        value: 1
    },
    navigation: {
        options: [
            "off",
            "on"
        ],
        category: "Anzeige",
        sub_category: "Mittelkonsole",
        value: 1
    }
};
