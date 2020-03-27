import React, {FunctionComponent} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/rootReducer";
import {Maybe} from "../../../redux/device/device.types";
import {setActiveDeviceAndSubscribeHistory} from "../../../redux/device/radEyeDevicesSlice";
import {Bluetooth, Flare, Refresh} from "@material-ui/icons";
import {createStyles, Grid, Paper, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AntPaper from "../../ui/surfaces/paper";
import MainContainer from "../../ui/layout/mainContainer";
import {useTranslation} from "react-i18next";
import {useActiveDeviceFields} from "../../../redux/device/deviceStoreSelectors";
import AntSlider from "../../ui/inputs/slider";
import AntSwitch from "../../ui/inputs/switch";
import ExampleRes from "./charts/responsiveLineChart";
import {MQTTqueryDevices} from "../../../mqtt/mqttClient";
import {H3} from "../../ui/typography";

const useStyles = makeStyles(({spacing, palette, breakpoints}: Theme) =>
    createStyles({
        device: {
            marginBottom: spacing(5),
            padding: spacing(3)
        },
        activeDevice: {
            background: palette.secondary.main
        },
        devicesList: {
            [breakpoints.down("sm")]: {
                display: "none"
            }
        },
        graph: {
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
        },
        doseInfo: {
            textAlign: "right",
            marginBottom: spacing(5),
            position: "relative"
        },
        refreshButton: {
            cursor: "pointer",
            position: "absolute",
            top: "40%",
            left: "20%",
            transform: "translate(-50%,-50%)",
            transition: "all 0.3s ease-in-out",

            "&:hover": {
                color: palette.secondary.main
            },
            "&:active": {
                transform: "scale(0.75)"
            },
            [breakpoints.up("lg")]: {
                fontSize: "6rem"
            },
            [breakpoints.down("md")]: {
                fontSize: "4rem"
            },
            [breakpoints.down("xs")]: {
                fontSize: "6rem"
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

    const {t} = useTranslation();
    const classes = useStyles();
    const {activeDevice, devices, activeDeviceDoseVisualisation} = useSelector((state: RootState) =>
        state.radEyeDevices, shallowEqual
    );
    const settings = useSelector((state: RootState) => state.app.settings, shallowEqual);

    const fields = useActiveDeviceFields((device => ({
        dose_rate: device.dose_rate,
        count_rate_gamma: device.count_rate_gamma,
        dose: device.dose,
    })));

    const onRefresh = () => MQTTqueryDevices();

    return (
        <MainContainer>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={3}>
                    <AntPaper>
                        <Grid container spacing={3} justify="space-between" style={{position: "relative"}}>
                            <Refresh onClick={onRefresh} className={classes.refreshButton}/>
                            <Grid item xs={12} sm={12} className={classes.doseInfo}>
                                <Typography variant="h6" component="h2">{t("dose_rate")}</Typography>
                                <Typography>{fields.dose_rate ? fields.dose_rate : "/"}</Typography>
                                <Typography style={{fontWeight: "bold"}}>{t("counter")}</Typography>
                                <Typography>{fields.count_rate_gamma ? fields.count_rate_gamma : "/"}</Typography>
                                <Typography style={{fontWeight: "bold"}}>{t("dose")}</Typography>
                                <Typography>{fields.dose ? fields.dose : "/"}</Typography>
                            </Grid>
                        </Grid>
                        <H3>{t("polling_interval")}</H3>
                        <AntSlider
                            name={"interval"}
                            label={`${t("polling_interval")} ${(settings?.interval)}`}
                            target={"settings"}
                            value={settings?.interval}
                            min={0}
                            max={20}
                            step={1}
                        />
                        <AntSwitch
                            name={"cyclic_update"}
                            label={"permanent_polling"}
                            target={"settings"}
                            value={settings?.cyclic_update}
                        />
                        <AntSwitch
                            name={"query_infodata"}
                            label={"infodata"}
                            target={"settings"}
                            value={settings?.query_infodata}
                        />
                        <AntSwitch
                            name={"query_measurements"}
                            label={"measurement_values"}
                            target={"settings"}
                            value={settings?.query_measurements}
                        />
                        <AntSwitch
                            name={"query_configuration_1"}
                            label={`${t("configuration")} 1`}
                            target={"settings"}
                            value={settings?.query_configuration_1}
                        />
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
                        <ExampleRes data={activeDeviceDoseVisualisation}/>
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
