import React, {FunctionComponent} from "react";
import {
    AppBar,
    Container,
    createStyles,
    FormControl,
    Grid,
    MenuItem,
    Select,
    Tab,
    Tabs,
    Theme,
    Typography
} from "@material-ui/core";
import {setActiveDeviceAndSubscribeHistory} from "../../../../redux/device/radEyeDevicesSlice";
import {Bluetooth, Flare} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/rootReducer";
import {useTabsWithRouter} from "../../../../App";
import {makeStyles} from "@material-ui/core/styles";
import AntLabel from "../../inputs/label";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainNavigationBar: {
            background: theme.palette.secondary.light
        },
        logo: {
            letterSpacing: "-0.07rem",
            fontWeight: 500,
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            [theme.breakpoints.only("xs")]: {
                textAlign: "center"
            }
        },
        formControl: {
            width: "100%",
            [theme.breakpoints.only("xs")]: {
                marginBottom: theme.spacing(3),
                textAlign: "center"
            },
        },
        activeDeviceIcon: {
            fontSize: "1rem",
            lineHeight: "80%",
            marginLeft: theme.spacing(0.5)
        }
    })
);

const MainNavigation: FunctionComponent = () => {

    const {devices} = useSelector((state: RootState) => ({
        dictReady: state.app.dictionary.ready,
        devices: state.radEyeDevices
    }));

    const dispatch = useDispatch();

    const {tabValue} = useTabsWithRouter(['/measurement', '/log', '/settings'], '/settings');

    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.mainNavigationBar}>
            <Container maxWidth={"lg"}>
                <Grid container justify={"space-between"} alignContent={"center"} alignItems={"center"}>
                    <Grid item xs={12} sm={5}>
                        <Typography variant={"h3"} className={classes.logo}>smartEye</Typography>
                    </Grid>
                    <Grid item xs={12} sm={5} md={3}>
                        <FormControl className={classes.formControl}>
                            <AntLabel>Active Device</AntLabel>
                            <Select
                                inputProps={{name: "deviceDropDown", id: "deviceDropDown"}}
                                value={devices.activeDevice ? devices.activeDevice : ""}
                                onChange={(event: React.ChangeEvent<any>) => dispatch(setActiveDeviceAndSubscribeHistory(event.target.value))}
                            >
                                {devices.devices && Object.values(devices.devices).map(device =>
                                    <MenuItem
                                        key={device.device_id}
                                        value={device.device_id}>
                                        {device.device_id}
                                        {device.connection_type === "BLE" ? <Bluetooth className={classes.activeDeviceIcon}/> : <Flare className={classes.activeDeviceIcon}/>}
                                    </MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Tabs value={tabValue} aria-label="simple tabs example" centered>
                            <Tab label="measurement" value={"/measurement"} component={Link} to={"/measurement"}/>
                            <Tab label="log" value={"/log"} component={Link} to={"/log"}/>
                            <Tab label="settings" value={"/settings"} component={Link} to={"/settings"}/>
                        </Tabs>
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    );
};

export default MainNavigation;
