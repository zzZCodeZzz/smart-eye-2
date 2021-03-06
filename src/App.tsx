import React from 'react';
import {BrowserRouter, Redirect, Route, Switch as RouterSwitch, useRouteMatch} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@material-ui/core";
import Settings from "./components/screens/settings";
import {Provider, useSelector} from "react-redux";
import store from "./redux/store";
import MyCssBaseline, {theme} from "./components/ui/layout/theme";
import {useConfigureAndConnectMqttClient} from "./mqtt/config";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {Measurement} from "./components/screens/measurement";
import MainNavigation from "./components/ui/layout/mainNavigation";
import Footer from "./components/ui/layout/footer";
import DeviceHistory from "./components/screens/history";
import {RootState} from "./redux/rootReducer";
import "moment/locale/de";
import moment from "moment";

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

moment.locale("de");

const useTranslationUpdate = () => useSelector((state: RootState) => state.app.dictionary.ready);

function App() {

    useConfigureAndConnectMqttClient();
    useTranslationUpdate();

    return (
        <div className="App">
           <MainNavigation />
            <RouterSwitch>
                <Route exact path={"/"}>
                    <Redirect to={"/settings"}/>
                </Route>
                <Route path={"/measurement"}>
                   <Measurement/>
                </Route>
                <Route path={"/log"}>
                   <DeviceHistory/>
                </Route>
                <Route path={"/settings"}>
                    <Settings/>
                </Route>
            </RouterSwitch>
            <Footer />
        </div>
    );
}

const AppWithContext = () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <MyCssBaseline />
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>);


export default AppWithContext;
