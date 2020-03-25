import React, {FunctionComponent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/rootReducer";
import {Maybe} from "../../../redux/device/device.types";
import {setActiveDeviceAndSubscribeHistory} from "../../../redux/device/radEyeDevicesSlice";
import {Bluetooth, Flare} from "@material-ui/icons";
import {createStyles, Grid, Paper, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AntPaper from "../../ui/surfaces/paper";
import MainContainer from "../../ui/layout/mainContainer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        device: {
            marginBottom: theme.spacing(3),
            padding: theme.spacing(3)
        },
        activeDevice: {
            background: theme.palette.secondary.main
        },
        devicesList: {
            [theme.breakpoints.down("sm")]: {
                display: "none"
            }
        }
    })
);

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
    const onClick = () => dispatch(setActiveDeviceAndSubscribeHistory(device_id));

    const classes = useStyles();

    return (
        <Paper
            className={`${classes.device} ${active && classes.activeDevice}`}
            onClick={onClick}
        >
            <Typography variant="h4">
                {connection_type === "BLE" ? <Bluetooth/> : <Flare/>}
            </Typography>
            type_info: {type_info ? type_info : "UNDEFINED"} <br/>
            serialNumber: {serialNumber} <br/>
            address: {device_id.split("@")[0]} <br/>
            gateway: {gateway} <br/>
            lastSeen: {lastSeen} <br/>
        </Paper>
    )
};

export const Measurement = () => {

    const {activeDevice, devices} = useSelector((state: RootState) => state.radEyeDevices);

    const classes = useStyles();

    return (
        <MainContainer>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4} md={3}>
                    <AntPaper>Dosisleistung</AntPaper>
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                    <AntPaper>Graph</AntPaper>
                </Grid>
                <Grid item xs={12} md={3} className={classes.devicesList}>
                    {devices && Object.values(devices).map(device =>
                        <Device
                            key={device.device_id}
                            active={activeDevice === device.device_id}
                            device_id={device.device_id}
                            type_info={device.type_info}
                            serialNumber={device.serial_number}
                            gateway={device.host_name}
                            lastSeen={device.last_seen}
                            connection_type={device.connection_type}
                        />)}

                </Grid>
            </Grid>
        </MainContainer>
    )
};
