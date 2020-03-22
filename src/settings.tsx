import React from "react"
import {Link, Route, Switch} from "react-router-dom";
import {useTabsWithRouter} from "./App";
import {AppBar, Tab, Tabs} from "@material-ui/core";

const Settings = (): JSX.Element => {

    const {tabValue} = useTabsWithRouter(
        [
            `/settings/general`,
            '/settings/log',
            '/settings/alarm',
            '/settings/function'
        ],
        '/settings/general'
    );

    return (
        <div>
            <AppBar position="static">
                <Tabs value={tabValue} aria-label="simple tabs example">
                    <Tab label="general" value={`/settings/general`} component={Link} to={`/settings/general`}/>
                    <Tab label="log" value={`/settings/log`} component={Link} to={`/settings/log`}/>
                    <Tab label="alarm" value={`/settings/alarm`} component={Link} to={`/settings/alarm`}/>
                    <Tab label="function" value={`/settings/function`} component={Link} to={`/settings/function`}/>
                </Tabs>
            </AppBar>
            <Switch>
                <Route path={`/settings/general`}>
                    general
                </Route>
                <Route path={`/settings/text`}>
                    text
                </Route>
                <Route path={`/settings/alarm`}>
                    alarm
                </Route>
                <Route path={`/settings/function`}>
                    function
                </Route>
            </Switch>
        </div>
    )
};

export default Settings;
