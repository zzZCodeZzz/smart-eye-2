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
