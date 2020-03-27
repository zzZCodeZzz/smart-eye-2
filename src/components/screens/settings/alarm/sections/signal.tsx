import React, {FunctionComponent} from "react";
import {Grid} from "@material-ui/core";
import AntSwitch from "../../../../ui/inputs/switch";
import AntInput from "../../../../ui/inputs/text";
import {H2} from "../../../../ui/typography";

const AlarmSignal: FunctionComponent = () => {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <H2>Alarmsignalisierung</H2>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <AntSwitch onChange={() => console.log("bla")} name="Schallgeber"/>
            </Grid>
            <Grid item xs={12} sm={12} md={6} >
                <AntSwitch onChange={() => console.log("bla")} name="LED"/>
            </Grid>
            <Grid item xs={12} sm={12} md={6} >
                <AntSwitch onChange={() => console.log("bla")} name="Vibrator"/>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <AntInput name="Alarm haltezeit" disabled/>
            </Grid>
        </Grid>
    );
};

export default AlarmSignal;
