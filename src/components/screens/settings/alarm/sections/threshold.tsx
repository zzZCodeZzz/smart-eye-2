import React from "react";
import {Grid, Typography} from "@material-ui/core";
import AntSwitch from "../../../../ui/inputs/switch";

const AlarmThreshold = () => {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                <Typography variant="h6">Alarmschwelle</Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
                <AntSwitch target={"settings"} name="nichtAernderbar"/>
            </Grid>
        </Grid>
    );
};

export default AlarmThreshold;
