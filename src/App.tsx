import React from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Switch as RouterSwitch, useRouteMatch} from "react-router-dom";
import {AppBar, Tab, Tabs} from "@material-ui/core";
import Settings from "./components/screens/settings";
import {Provider} from "react-redux";
import store from "./redux/store";
import {useConfigureAndConnectMqttClient} from "./mqtt/mqttHook";
// import {useConfigureAndConnectMqttClient} from "./mqtt/mqttClient";


export const useTabsWithRouter = (routes: string | string[], defaultRoute: string) => {
    const match = useRouteMatch(routes);

    return {
        tabValue: match ? match.path : defaultRoute,
        path: match?.path
    };
};


function App() {

    const {tabValue} = useTabsWithRouter(['/measurement', '/log', '/settings'], '/settings');
    // const dispatch=useDispatch();
    useConfigureAndConnectMqttClient();

    return (
        <div className="App">
            <AppBar position="static">
                <Tabs value={tabValue} aria-label="simple tabs example">
                    <Tab label="measurement" value={"/measurement"} component={Link} to={"/measurement"}/>
                    <Tab label="log" value={"/log"} component={Link} to={"/log"}/>
                    <Tab label="settings" value={"/settings"} component={Link} to={"/settings"}/>
                </Tabs>
            </AppBar>
            <RouterSwitch>
                <Route path={"/measurement"}>
                    measurement
                </Route>
                <Route path={"/log"}>RouterSwitch
                    log
                </Route>
                <Route path={"/settings"}>
                    <Settings/>
                </Route>
            </RouterSwitch>
        </div>
    );
}

const AppWithRouter = () => (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>);


export default AppWithRouter;
