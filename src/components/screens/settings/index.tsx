import React, {Fragment} from "react"
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {useTabsWithRouter} from "../../../App";
import {AppBar, createStyles, Tab, Tabs, Theme} from "@material-ui/core";
import GeneralSettings from "./general";
import MainContainer from "../../ui/layout/mainContainer";
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";

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

    const {t} = useTranslation();

    return (
        <Fragment>
            <AppBar position="relative" className={classes.settingsNavigation}>
                <Tabs value={tabValue} aria-label="simple tabs example" centered>
                    <Tab label={t("general_settings")} value="/settings/general" component={Link} to="/settings/general"/>
                    <Tab label={t("alarm_settings")} value="/settings/alarm" component={Link} to="/settings/alarm"/>
                    <Tab label={t("functions_settings")} value="/settings/function" component={Link} to="/settings/function"/>
                </Tabs>
            </AppBar>
            <MainContainer>
                <Switch>
                    <Route exact path={"/settings"}>
                        <Redirect to={"/settings/general"}/>
                    </Route>
                    <Route path={"/settings/general"}>
                        <GeneralSettings/>
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
