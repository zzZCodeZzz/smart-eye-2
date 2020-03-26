import React, {FunctionComponent} from "react";
import {useAlarmStyles} from "../index";
import {Grid, Typography} from "@material-ui/core";
import AntSwitch from "../../../../ui/inputs/switch";
import AntInput from "../../../../ui/inputs/text";
import AntPaper from "../../../../ui/surfaces/paper";

const AlarmSignal:FunctionComponent = () => {

    const classes = useAlarmStyles();

    return (
        <AntPaper>
            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.paperTitle}>
                    <Typography variant="h6">Alarmsignalisierung</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AntSwitch target={"settings"} name="Schallgeber"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AntSwitch target={"settings"} name="LED"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AntSwitch target={"settings"} name="Vibrator"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AntInput name="Alarm haltezeit" disabled/>
                </Grid>
            </Grid>
        </AntPaper>
    );
};

export default AlarmSignal;
