import {shallowEqual, useSelector} from "react-redux";
import {RootState} from "../rootReducer";
import {Device} from "./device.types";
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
