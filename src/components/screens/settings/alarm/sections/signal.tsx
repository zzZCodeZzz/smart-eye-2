import React, {FunctionComponent} from "react";
import {Grid, Typography} from "@material-ui/core";
import AntSwitch from "../../../../ui/inputs/switch";
import AntInput from "../../../../ui/inputs/text";

const AlarmSignal: FunctionComponent = () => {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h6">Alarmsignalisierung</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={12}>
                <AntSwitch target={"settings"} name="Schallgeber"/>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={12}>
                <AntSwitch target={"settings"} name="LED"/>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={12}>
                <AntSwitch target={"settings"} name="Vibrator"/>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={12}>
                <AntInput name="Alarm haltezeit" disabled/>
            </Grid>
        </Grid>
    );
};

export default AlarmSignal;
