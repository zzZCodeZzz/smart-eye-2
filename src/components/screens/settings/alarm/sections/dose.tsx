import React from "react";
import {Grid, Typography} from "@material-ui/core";
import AntInput from "../../../../ui/inputs/text";
import {H2} from "../../../../ui/typography";

const AlarmDose = () => {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <H2>Dosis</H2>
            </Grid>
            <Grid item xs={12} sm={12}>
                <Typography variant="subtitle1">Level</Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
                <AntInput name="Alarm 1"/>
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
                <AntInput name="Alarm 2"/>
            </Grid>
        </Grid>
    );
};

export default AlarmDose;
