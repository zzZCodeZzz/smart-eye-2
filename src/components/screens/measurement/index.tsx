import React, {FunctionComponent} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/rootReducer";
import {Maybe} from "../../../redux/device/device.types";
import {setActiveDeviceAndSubscribeHistory} from "../../../redux/device/radEyeDevicesSlice";
import {Bluetooth, Flare, Refresh} from "@material-ui/icons";
import {createStyles, Divider, Grid, Paper, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AntPaper from "../../ui/surfaces/paper";
import MainContainer from "../../ui/layout/mainContainer";
import {useTranslation} from "react-i18next";
import {useActiveDeviceFields} from "../../../redux/device/deviceStoreSelectors";
import AntSlider from "../../ui/inputs/slider";
import AntSwitch from "../../ui/inputs/switch";
import ExampleRes from "./charts/responsiveLineChart";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        device: {
            marginBottom: theme.spacing(5),
            padding: theme.spacing(3)
        },
        activeDevice: {
            background: theme.palette.secondary.main
        },
        devicesList: {
            [theme.breakpoints.down("sm")]: {
                display: "none"
            }
        },
        graph: {
            minHeight: "37rem",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",

            [theme.breakpoints.up("md")]: {
                width: "calc(100% - 24px)",
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)"
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

const data = [
    {name: 1, cost: 4.11, impression: 100},
    {name: 2, cost: 2.39, impression: 120},
    {name: 3, cost: 1.37, impression: 150},
    {name: 4, cost: 1.16, impression: 180},
    {name: 5, cost: 2.29, impression: 200},
    {name: 6, cost: 3, impression: 499},
    {name: 7, cost: 0.53, impression: 50},
    {name: 8, cost: 2.52, impression: 100},
    {name: 9, cost: 1.79, impression: 200},
    {name: 10, cost: 2.94, impression: 222},
    {name: 11, cost: 4.3, impression: 210},
    {name: 12, cost: 4.41, impression: 300},
    {name: 13, cost: 2.1, impression: 50},
    {name: 14, cost: 8, impression: 190},
    {name: 15, cost: 0, impression: 300},
    {name: 16, cost: 9, impression: 400},
    {name: 17, cost: 3, impression: 200},
    {name: 18, cost: 2, impression: 50},
    {name: 19, cost: 3, impression: 100},
    {name: 20, cost: 7, impression: 100},
];

export const Measurement = () => {

    const {t} = useTranslation();
    const classes = useStyles();
    const {activeDevice, devices} = useSelector((state: RootState) => state.radEyeDevices, shallowEqual);
    const settings = useSelector((state: RootState) => state.app.settings);

    const fields = useActiveDeviceFields((device => ({
        dose_rate: device.dose_rate,
        count_rate_gamma: device.count_rate_gamma,
        dose: device.dose
    })));

    return (
        <MainContainer>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={3}>
                    <AntPaper>
                        <Grid container spacing={1} justify="space-between">
                            <Grid item xs={4} alignItems="center" style={{alignSelf: "center", textAlign: "center"}}>
                                <Refresh/>
                            </Grid>
                            <Grid item xs={8} style={{textAlign: "right"}}>
                                <Typography variant={"h6"}>{t("dose_rate")}</Typography>
                                <Typography>{fields.dose_rate ? fields.dose_rate : "/"}</Typography>
                                <Typography style={{fontWeight: "bold"}}>{t("counter")}</Typography>
                                <Typography>{fields.count_rate_gamma ? fields.count_rate_gamma : "/"}</Typography>
                                <Typography style={{fontWeight: "bold"}}>{t("dose")}</Typography>
                                <Typography>{fields.dose ? fields.dose : "/"}</Typography>
                            </Grid>
                        </Grid><br />
                        <Divider/><br />
                        <Typography style={{fontWeight: "bold"}}>{t("polling_interval")}</Typography><br />
                        <AntSlider
                            name={"polling_interval"}
                            target={"settings"}
                            max={1}
                            min={20}
                            step={1}
                        /><br />
                        <AntSwitch
                            name={"cyclic_update"}
                            label={"permanent_polling"}
                            target={"settings"}
                            value={settings?.cyclic_update}
                        /><br />
                        <AntSwitch
                            name={"query_infodata"}
                            label={"infodata"}
                            target={"settings"}
                            value={settings?.query_infodata}
                        /><br />
                        <AntSwitch
                            name={"query_measurements"}
                            label={"measurement_values"}
                            target={"settings"}
                            value={settings?.query_measurements}
                        /><br />
                        <AntSwitch
                            name={"query_configuration_1"}
                            label={`${t("configuration")} 1`}
                            target={"settings"}
                            value={settings?.query_configuration_1}
                        /><br />
                        <AntSwitch
                            name={"query_configuration_2"}
                            label={`${t("configuration")} 2`}
                            target={"settings"}
                            value={settings?.query_configuration_2}
                        />
                    </AntPaper>
                </Grid>
                <Grid item xs={12} sm={8} md={6} style={{position: "relative"}}>
                    <AntPaper className={classes.graph}>
                        <ExampleRes data={data}/>
                    </AntPaper>
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
