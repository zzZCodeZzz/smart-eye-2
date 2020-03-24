import {shallowEqual, useSelector} from "react-redux";
import {RootState} from "../rootReducer";
import {Device} from "./device.types";

export const useActiveDevice = () => useSelector((state: RootState): Device | null =>
        state.devices && state.devices.devices && state.devices.activeDevice
            ? state.devices.devices[state.devices.activeDevice] : null,
    shallowEqual
);

export const useActiveDeviceFields = <T>(selector: (device: Device) => T): T | null => {
    const activeDevice = useActiveDevice();
    return activeDevice ? selector(activeDevice) : null
};



