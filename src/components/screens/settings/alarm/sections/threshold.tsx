import React, {Fragment} from "react";
import {Grid, Typography} from "@material-ui/core";
import {useAlarmStyles} from "../index";
import AntSwitch from "../../../../ui/inputs/switch";

const AlarmThreshold = () => {

    const classes = useAlarmStyles();

    return (
        <Fragment>
            <Grid item sm={12} md={6} className={classes.paperTitle}>
                <Typography variant="h6">Alarmschwelle</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <AntSwitch target={"settings"} name="nichtAernderbar"/>
            </Grid>
        </Fragment>
    );
};

export default AlarmThreshold;
