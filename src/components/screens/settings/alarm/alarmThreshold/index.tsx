import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {useAlarmStyles} from "../index";
import AntSwitch from "../../../../ui/inputs/switch";
import AntPaper from "../../../../ui/surfaces/paper";

const AlarmThreshold = () => {

    const classes = useAlarmStyles();

    return (
        <AntPaper>
            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.paperTitle}>
                    <Typography variant="h6">Alarmschwelle</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AntSwitch target={"settings"} name="nichtAernderbar"/>
                </Grid>
            </Grid>
        </AntPaper>
    );
};

export default AlarmThreshold;
