import React, {Fragment} from "react"
import {Link, Route, Switch, Redirect} from "react-router-dom";
import {useTabsWithRouter} from "../../../App";
import {AppBar, createStyles, Tab, Tabs, Theme} from "@material-ui/core";
import GeneralSettings from "./general";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            overflowX: "hidden",
            padding: 20,
            minHeight: "80vh"
        },
    }),
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
            <AppBar position="relative">
                <Tabs value={tabValue} aria-label="simple tabs example">
                    <Tab label="general" value="/settings/general" component={Link} to="/settings/general"/>
                    <Tab label="log" value="/settings/log" component={Link} to="/settings/log"/>
                    <Tab label="alarm" value="/settings/alarm" component={Link} to="/settings/alarm"/>
                    <Tab label="function" value="/settings/function" component={Link} to="/settings/function"/>
                </Tabs>
            </AppBar>
            <div className={classes.root}>
                <Switch>
                    <Route exact path={"/settings"}>
                        <Redirect to={"/settings/general"}/>
                    </Route>
                    <Route path={"/settings/general"}>
                        <GeneralSettings/>
                    </Route>
                    <Route path={"/settings/log"}>
                        log
                    </Route>
                    <Route path={"/settings/alarm"}>
                        alarm
                    </Route>
                    <Route path={"/settings/function"}>
                        function
                    </Route>
                </Switch>
            </div>
        </Fragment>
    )
};

export default Settings;
