import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {useAlarmStyles} from "../index";
import AntTextField from "../../../../ui/inputs/text";
import AntPaper from "../../../../ui/surfaces/paper";

const AlarmDose = () => {

    const classes = useAlarmStyles();

    return (
        <AntPaper>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} className={classes.paperTitle}>
                    <Typography variant="h6">Dosis</Typography>
                </Grid>
                <Grid item xs={12} sm={2} className={classes.label}>
                    <Typography variant="subtitle1">Level</Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <AntTextField name="Alarm 1"/>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <AntTextField name="Alarm 2"/>
                </Grid>
            </Grid>
        </AntPaper>
    );
};

export default AlarmDose;
