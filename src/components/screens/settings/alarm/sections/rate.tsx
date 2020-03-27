import React, {Fragment} from "react";
import {Grid, Typography} from "@material-ui/core";
import AntInput from "../../../../ui/inputs/text";
import AntSwitch from "../../../../ui/inputs/switch";
import {useAlarmStyles} from "../index";

const AlarmRate = () => {

    const classes = useAlarmStyles();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h6">
                    Raten
                </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={2} lg={1} className={classes.right}>
                <Typography variant="subtitle1">
                    Level
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
                <AntInput name="Alarm 1"/>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
                <AntInput name="Alarm 2"/>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2} className={classes.placeHolder}/>
            <Grid item xs={12} sm={6} md={2} lg={2} className={classes.placeHolder}/>
            <Grid item xs={12} sm={6} md={2} lg={3} className={classes.placeHolder}/>


            <Grid item xs={12} sm={12} md={2} lg={1} className={classes.right}>
                <Typography variant="subtitle1">
                    Zählrate
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
                <AntInput
                    name="Alarm 1"/>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
                <AntInput
                    name="Alarm 2"/>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
                <AntInput
                    name="Sigma *)"/>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
                <AntInput
                    name="Sigm min rate"
                    adornment={<Fragment>s<sup>-1</sup></Fragment>}/>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={3}>
                <AntSwitch
                    target={"settings"}
                    name="securityAlarm">
                    Sicherheitsalarm</AntSwitch>
            </Grid>


            <Grid item xs={12} sm={12} md={2} lg={1} className={classes.right}>
                <Typography variant="subtitle1">Dosierung</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
                <AntInput name="Alarm 1" adornment={"μSW/h"}/>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
                <AntInput name="Alarm 2"/>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2} className={classes.placeHolder}/>
            <Grid item xs={12} sm={6} md={2} lg={2} className={classes.placeHolder}/>
            <Grid item xs={12} sm={6} md={2} lg={3} className={classes.placeHolder}/>
        </Grid>
    );
};

export default AlarmRate;
