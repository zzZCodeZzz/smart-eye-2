import React from 'react';
import {BrowserRouter, Link, Route, Switch as RouterSwitch, useRouteMatch, Redirect} from "react-router-dom";
// import Settings from "./settings";
import {
    AppBar, Container,
    CssBaseline,
    FormControl, Grid,
    InputLabel,
    MenuItem,
    Select,
    Tab,
    Tabs,
    ThemeProvider,
    Toolbar, Typography
} from "@material-ui/core";
import Settings from "./components/screens/settings";
import {Provider, useDispatch, useSelector} from "react-redux";
import store from "./redux/store";
import {theme} from "./components/ui/layout/theme";
import MainContainer from "./components/ui/layout/mainContainer";
import {useConfigureAndConnectMqttClient} from "./mqtt/config";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {RootState} from "./redux/rootReducer";
import {Measurement} from "./components/screens/measurement";
import {setActiveDevice} from './redux/device/radEyeDevicesSlice';
import {Bluetooth, Flare} from "@material-ui/icons";
import {useActiveDevice} from "./redux/device/deviceStoreSelectors";

export const useTabsWithRouter = (routes: string | string[], defaultRoute: string) => {
    const match = useRouteMatch(routes);

    return {
        tabValue: match ? match.path : defaultRoute,
        path: match?.path
    };
};

i18n.use(initReactI18next)
    .init({
        resources: {},
        fallbackLng: "de",
        interpolation: {
            escapeValue: false
        }
    });

function App() {

    useConfigureAndConnectMqttClient();

    // triggers rerender when dict is ready
    const {devices} = useSelector((state: RootState) => ({
        dictReady: state.app.dictionary.ready,
        devices: state.radEyeDevices
    }));

    const activeDevice = useActiveDevice();

    const dispatch = useDispatch();

    const {tabValue} = useTabsWithRouter(['/measurement', '/log', '/settings'], '/settings');

    return (
        <div className="App">
            <AppBar position="static">
                <Container maxWidth={"lg"}>
                    <Grid container justify={"space-between"} alignContent={"center"} alignItems={"center"}>
                        <Grid item xs={12} md={5}>
                            <Typography variant={"h3"} style={{fontWeight: 500, padding: "10px"}}>smartEye</Typography>
                        </Grid>
                        <Grid item xs={12} md={3} style={{padding: "0 10px 5px"}}>
                            <FormControl style={{width: "100%", textAlign: "center"}}>
                                <InputLabel htmlFor={"deviceDropDown"}>{"Active Device"}</InputLabel>
                                <Select
                                    inputProps={{name: "deviceDropDown", id: "deviceDropDown"}}
                                    value={devices.activeDevice}
                                    onChange={(event: React.ChangeEvent<any>) => dispatch(setActiveDevice(event.target.value))}
                                >
                                    {devices.devices && Object.values(devices.devices).map(device =>
                                        <MenuItem
                                            key={device.device_id}
                                            value={device.device_id}>
                                            {device.device_id}
                                            {device.connection_type === "BLE" ? <Bluetooth/> : <Flare/>}
                                        </MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} justify={"center"}>
                            <Tabs value={tabValue} aria-label="simple tabs example" centered>
                                <Tab label="measurement" value={"/measurement"} component={Link} to={"/measurement"}/>
                                <Tab label="log" value={"/log"} component={Link} to={"/log"}/>
                                <Tab label="settings" value={"/settings"} component={Link} to={"/settings"}/>
                            </Tabs>
                        </Grid>
                    </Grid>
                </Container>
            </AppBar>
            <RouterSwitch>
                <Route exact path={"/"}>
                    <Redirect to={"/settings"}/>
                </Route>
                <Route path={"/measurement"}>
                    <MainContainer><Measurement/></MainContainer>
                </Route>
                <Route path={"/log"}>
                    <MainContainer>log</MainContainer>
                </Route>
                <Route path={"/settings"}>
                    <Settings/>
                </Route>
            </RouterSwitch>
            <AppBar position="static" component="footer">
                <Container maxWidth="lg">
                    <Toolbar>
                        Verbindungsart: {activeDevice && activeDevice.connection_type}
                        Seriennummer: {activeDevice && activeDevice.serial_number}
                        Batterie: {activeDevice && activeDevice.batteryType}
                        Letzt kalibrierung: ?
                        Aktiv: {activeDevice && activeDevice.last_seen}
                        Temparatur: {activeDevice && activeDevice.temperature}
                        Standort: Wolfratshause
                        Boardnummer: {activeDevice && activeDevice.board_number}
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

const AppWithContext = () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>);


export default AppWithContext;
