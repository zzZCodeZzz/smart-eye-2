import React, {Fragment} from "react";
import {Grid} from "@material-ui/core";
import AntInput from "../../../../ui/inputs/text";
import AntSwitch from "../../../../ui/inputs/switch";
import {H2, H3} from "../../../../ui/typography";
import {useAlarmStyles} from "../index";

const AlarmRate = () => {

    const classes = useAlarmStyles();

    const onTempChange = () => {
        console.log("todo change")
    };


    return (
        <Grid container spacing={1} justify={"space-between"}>
            <H2>Raten</H2>
            <Grid container xs={12} md={6} lg={6} spacing={1}>
                <Grid item xs={12} sm={12}>
                    <H3>Level</H3>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AntInput name="Alarm 1"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AntInput name="Alarm 2"/>
                </Grid>
            </Grid>

            <Grid container xs={12} md={6} lg={6} spacing={1}>
                <Grid item xs={12} sm={12}>
                    <H3>Dosierung</H3>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AntInput name="Alarm 1"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AntInput name="Alarm 2"/>
                </Grid>
            </Grid>


            <Grid item xs={12}>
                <H3>Zählrate</H3>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <AntInput
                    name="Alarm 1"/>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <AntInput
                    name="Alarm 2"/>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <AntInput
                    name="Sigma *)"/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AntInput
                    name="Sig min rate"
                    adornment={<Fragment>s<sup>-1</sup></Fragment>}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AntSwitch
                    name="securityAlarm"
                    onChange={onTempChange}
                >
                    Sicherheitsalarm
                </AntSwitch>
            </Grid>


        </Grid>
    );
};

export default AlarmRate;
