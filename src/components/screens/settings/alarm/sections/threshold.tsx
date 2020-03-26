import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {useAlarmStyles} from "../index";
import AntSwitch from "../../../../ui/inputs/switch";

const AlarmThreshold = () => {

    const classes = useAlarmStyles();

    return (
        <div className={classes.normalizeHeight1}>
            <Grid item xs={12} sm={12} md={6} className={classes.paperTitle}>
                <Typography variant="h6">Alarmschwelle</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} className={classes.centralize}>
                <AntSwitch target={"settings"} name="nichtAernderbar"/>
            </Grid>
        </div>
    );
};

export default AlarmThreshold;
