import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {useAlarmStyles} from "../index";
import AntSwitch from "../../../../ui/inputs/switch";
import AntTextField from "../../../../ui/inputs/text";
import AntSlider from "../../../../ui/inputs/slider";
import AntPaper from "../../../../ui/surfaces/paper";


const AlarmEnergyRate = () => {

    const classes = useAlarmStyles();

    return (
        <AntPaper>
            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.paperTitle}>
                    <Typography variant="h6">Energieverhältnis</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AntSwitch target={"settings"} name="Aktiv"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AntTextField name="Minimale Werte"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AntSlider target={"device"} name={"Empfindlichkeit Niederenergie"} max={100} min={0} step={10}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AntSlider target={"device"} name={"Empfindlichkeit Hochenergie"} max={100} min={0} step={10}/>
                </Grid>
            </Grid>
        </AntPaper>
    );
};

export default AlarmEnergyRate;
