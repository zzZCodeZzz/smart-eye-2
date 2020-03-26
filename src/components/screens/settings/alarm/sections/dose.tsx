import React, {Fragment} from "react";
import {Grid, Typography} from "@material-ui/core";
import {useAlarmStyles} from "../index";
import AntInput from "../../../../ui/inputs/text";

const AlarmDose = () => {

    const classes = useAlarmStyles();

    return (
        <Fragment>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} className={classes.paperTitle}>
                    <Typography variant="h6">Dosis</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={2} className={classes.label}>
                    <Typography variant="subtitle1">Level</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={5}>
                    <AntInput name="Alarm 1"/>
                </Grid>
                <Grid item xs={12} sm={12} md={5}>
                    <AntInput name="Alarm 2"/>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default AlarmDose;
