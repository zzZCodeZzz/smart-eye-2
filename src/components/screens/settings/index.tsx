import React, {Fragment} from "react"
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {useTabsWithRouter} from "../../../App";
import {AppBar, Tab, Tabs} from "@material-ui/core";
import GeneralSettings from "./general";
import MainContainer from "../../ui/layout/mainContainer";

const Settings = (): JSX.Element => {

    const {tabValue} = useTabsWithRouter(
        [
            "/settings/general",
            "/settings/log",
            "/settings/alarm",
            "/settings/function"
        ],
        "/settings/general"
    );

    return (
        <Fragment>
            <AppBar position="relative">
                <Tabs value={tabValue} aria-label="simple tabs example">
                    <Tab label="general" value="/settings/general" component={Link} to="/settings/general"/>
                    <Tab label="alarm" value="/settings/alarm" component={Link} to="/settings/alarm"/>
                    <Tab label="function" value="/settings/function" component={Link} to="/settings/function"/>
                </Tabs>
            </AppBar>
            <MainContainer>
                <Switch>
                    <Route exact path={"/settings"}>
                        <Redirect to={"/settings/general"}/>
                    </Route>
                    <Route path={"/settings/general"}>
                        <GeneralSettings />
                    </Route>
                    <Route path={"/settings/alarm"}>
                        alarm
                    </Route>
                    <Route path={"/settings/function"}>
                        function
                    </Route>
                </Switch>
            </MainContainer>
        </Fragment>
    )
};

export default Settings;
