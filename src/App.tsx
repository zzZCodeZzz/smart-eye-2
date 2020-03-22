import React from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Switch as RouterSwitch, useLocation} from "react-router-dom";
import Settings from "./settings";
import {AppBar, createStyles, Switch, Tab, Tabs, Theme, withStyles} from "@material-ui/core";

const AntSwitch = withStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 28,
            height: 16,
            padding: 0,
            display: 'flex',
        },
        switchBase: {
            padding: 2,
            color: theme.palette.grey[500],
            '&$checked': {
                transform: 'translateX(12px)',
                color: theme.palette.common.white,
                '& + $track': {
                    opacity: 1,
                    backgroundColor: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                },
            },
        },
        thumb: {
            width: 12,
            height: 12,
            boxShadow: 'none',
        },
        track: {
            border: `1px solid ${theme.palette.grey[500]}`,
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor: theme.palette.common.white,
        },
        checked: {},
    }),
)(Switch);

function App() {

    const location = useLocation();

    return (
        <div className="App">
            <AppBar position="static">
                <Tabs value={location.pathname} aria-label="simple tabs example">
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
    <BrowserRouter>
        <App/>
    </BrowserRouter>);


export default AppWithRouter;
