import React, {FunctionComponent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/rootReducer";
import {Maybe} from "../../../redux/device/device.types";
import {setActiveDevice} from "../../../redux/device/radEyeDevicesSlice";
import {Bluetooth, Flare} from "@material-ui/icons";

type DeviceProps = {
    active: boolean;
    device_id: string;
    serialNumber: Maybe<string>;
    type_info: Maybe<string>;
    connection_type: Maybe<string>;
    gateway: Maybe<string>;
    lastSeen: Maybe<string>;
}

const Device: FunctionComponent<DeviceProps> = ({active, connection_type, serialNumber, type_info, device_id, gateway, lastSeen}) => {

    const dispatch = useDispatch();
    const onClick = () => dispatch(setActiveDevice(device_id));

    return (
        <div
            style={{border: active ? "solid blue" : "solid", marginBottom: 15}}
            onClick={onClick}
        >
            {connection_type === "BLE" ? <Bluetooth/> : <Flare/>}
            type_info: {type_info ? type_info : "UNDEFINED"} <br/>
            serialNumber: {serialNumber} <br/>
            address: {device_id.split("@")[0]} <br/>
            gateway: {gateway} <br/>
            lastSeen: {lastSeen} <br/>
        </div>
    )
};

export const Measurement = () => {

    const {activeDevice, devices} = useSelector((state: RootState) => state.radEyeDevices);

    return (
        <div>
            {activeDevice}
            {devices && Object.values(devices).map(device =>
                <Device
                    active={activeDevice === device.device_id}
                    device_id={device.device_id}
                    type_info={device.type_info}
                    serialNumber={device.serial_number}
                    gateway={device.host_name}
                    lastSeen={device.last_seen}
                    connection_type={device.connection_type}
                />)}
        </div>
    )
};
