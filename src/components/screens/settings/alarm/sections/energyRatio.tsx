import React from "react";
import {Grid} from "@material-ui/core";
import AntSwitch from "../../../../ui/inputs/switch";
import AntInput from "../../../../ui/inputs/text";
import AntSlider from "../../../../ui/inputs/slider";
import {H2} from "../../../../ui/typography";


const AlarmEnergyRate = () => {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <H2>Energieverhältnis</H2>
            </Grid>
            <Grid item xs={12} sm={12} md={6} >
                <AntSwitch onChange={() => console.log("bal")} name="Aktiv"/>
            </Grid>
            <Grid item xs={12} sm={12} md={6} >
                <AntInput name="Minimale Werte"/>
            </Grid>
            <Grid item xs={12} sm={12} md={6} >
                <AntSlider
                    name={"Empfindlichkeit Niederenergie"}
                    max={100}
                    min={0}
                    step={10}
                    onChange={(event, value) => {
                        console.log(value)
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6} >
                <AntSlider
                    onChange={(event, value) => {
                        console.log(value)
                    }}
                    name={"Empfindlichkeit Hochenergie"} max={100} min={0} step={10}/>
            </Grid>
        </Grid>
    );
};

export default AlarmEnergyRate;
