import React from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Switch as RouterSwitch, useRouteMatch} from "react-router-dom";
// import Settings from "./settings";
import {AppBar, CssBaseline, Tab, Tabs, ThemeProvider, Toolbar} from "@material-ui/core";
import Settings from "./components/screens/settings";
import {Provider, useSelector} from "react-redux";
import store from "./redux/store";
import {theme} from "./components/ui/layout/theme";
import MainContainer from "./components/ui/layout/mainContainer";
import {useConfigureAndConnectMqttClient} from "./mqtt/config";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {RootState} from "./redux/rootReducer";

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

    const {tabValue} = useTabsWithRouter(['/measurement', '/log', '/settings'], '/settings');

    useConfigureAndConnectMqttClient();

    useSelector((state: RootState) => state.app.dictionary.ready);

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
                    <MainContainer>measurement</MainContainer>
                </Route>
                <Route path={"/log"}>
                    <MainContainer>log</MainContainer>
                </Route>
                <Route path={"/settings"}>
                    <Settings/>
                </Route>
            </RouterSwitch>
            <AppBar position="static" component="footer">
                <Toolbar>
                    Footer
                </Toolbar>
            </AppBar>
        </div>
    );
}

const AppWithRouter = () => (
    <Provider store={store}>
        <ThemeProvider theme={theme} >
            <CssBaseline />
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>);


export default AppWithRouter;
