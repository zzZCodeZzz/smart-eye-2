import React, {Fragment} from "react"
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {useTabsWithRouter} from "../../../App";
import {AppBar, createStyles, Tab, Tabs, Theme} from "@material-ui/core";
import GeneralSettings from "./general";
import MainContainer from "../../ui/layout/mainContainer";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        settingsNavigation: {
            background: theme.palette.background.default
        }
    })
);

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

    const classes = useStyles();

    return (
        <Fragment>
            <AppBar position="relative" className={classes.settingsNavigation}>
                <Tabs value={tabValue} aria-label="simple tabs example" centered>
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
