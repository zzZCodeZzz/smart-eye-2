import {shallowEqual, useSelector} from "react-redux";
import {RootState} from "../rootReducer";
import {ConfigurationFlag, Device} from "./device.types";
import {DeviceHistoryEntry} from "./radEyeDevicesSlice";

export const useActiveDevice = () => useSelector((state: RootState): Device | null =>
        state.radEyeDevices && state.radEyeDevices.devices && state.radEyeDevices.activeDevice
            ? state.radEyeDevices.devices[state.radEyeDevices.activeDevice] : null,
    shallowEqual
);

export const useActiveDeviceFields = <T>(selector: (device: Device) => T): T => {
    const activeDevice = useActiveDevice();
    return activeDevice ? selector(activeDevice) : {} as T;
};

export const useGeneralDeviceSettingsSelector = () => useSelector((state: RootState) => {
    const activeDevice = state.radEyeDevices && state.radEyeDevices.devices && state.radEyeDevices.activeDevice
        ? state.radEyeDevices.devices[state.radEyeDevices.activeDevice] : null;

    if (activeDevice) {
        return {
            language: activeDevice.language,
            reversible: activeDevice.reversible,
            battery_type: activeDevice.battery_type,
            accustic_view: activeDevice.accustic_view,
            dose_rate_display_unit: activeDevice.dose_rate_display_unit,
            dose_rate_cps: activeDevice.dose_rate_cps,
            temperature_display: activeDevice.temperature_display,
            beep_on_key: activeDevice.beep_on_key,
            keyboard_lock: activeDevice.keyboard_lock,
            graphical_view: activeDevice.graphical_view,
            show_dr_in_cps_mode: activeDevice.show_dr_in_cps_mode,
            pick_date: activeDevice.pick_date,
            pick_time: activeDevice.pick_time,
            history_log_time: activeDevice.history_log_time
        }
    } else {
        return {};
    }
});

export const useActiveDeviceHistory = (): DeviceHistoryEntry[] => {
    const history = useSelector((state: RootState) => state.radEyeDevices.activeDeviceHistory, shallowEqual);
    return history ? history : [] as DeviceHistoryEntry[]
};

type GroupedConfigurationFlags = {
    [category: string]: {
        [sub_category: string]: {
            [flag_key: string]: ConfigurationFlag
        }
    }
}

export const useActiveDeviceConfigurationFlags = () => useSelector((state: RootState): GroupedConfigurationFlags => {
    const {radEyeDevices} = state;
    if (radEyeDevices.activeDevice &&
        radEyeDevices.devices &&
        radEyeDevices.devices[radEyeDevices.activeDevice] &&
        radEyeDevices.devices[radEyeDevices.activeDevice].configuration_flags) {

        const {configuration_flags} = radEyeDevices.devices[radEyeDevices.activeDevice];

        return Object
            .entries(configuration_flags)
            .reduce((acc: GroupedConfigurationFlags, [key, value]) => {
                if (acc[value.category] === undefined) acc[value.category] = {};
                if (acc[value.category][value.sub_category] === undefined) acc[value.category][value.sub_category] = {};
                acc[value.category][value.sub_category][key] = value;
                return acc;
            }, {})

    } else {
        return {};
    }
}, shallowEqual);
