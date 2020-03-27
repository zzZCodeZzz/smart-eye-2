import React from "react";
import {Grid} from "@material-ui/core";
import AntSwitch from "../../../../ui/inputs/switch";
import {H2} from "../../../../ui/typography";

const AlarmThreshold = () => {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                <H2>Alarmschwelle</H2>
            </Grid>
            <Grid item xs={12} sm={12}>
                <AntSwitch target={"settings"} name="nichtAernderbar"/>
            </Grid>
        </Grid>
    );
};

export default AlarmThreshold;
