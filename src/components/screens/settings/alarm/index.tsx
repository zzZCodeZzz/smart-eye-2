import React, {Fragment} from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {createStyles, Grid, Typography} from "@material-ui/core";
import AntTextField from "../../../ui/inputs/text";
import AntSwitch from "../../../ui/inputs/switch";
import AntSlider from "../../../ui/inputs/slider";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridContainer: {
            justifyContent: "center",
            padding: theme.spacing(1),
        },
        label: {
            textAlign: "right",
            [theme.breakpoints.down("md")]: {
                textAlign: "center"
            },
            [theme.breakpoints.only("xs")]: {
                textAlign: "left"
            }
        },
        paper: {
            width: "100%",
            padding: theme.spacing(1)
        },
        paperTitle: {
            padding: 0,
            margin: 0
        },
        emptySpace: {
            [theme.breakpoints.down("md")]: {
                display: "none"
            },
        }
    }),
);

const AlarmSettings = () => {

    const classes = useStyles();

    return (
        <Fragment>
            <Grid container className={classes.gridContainer} spacing={3} alignItems="center">
                <Grid item xs={12} className={classes.paperTitle}>
                    <Typography variant="h6">Raten</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={2}>
                    <Typography variant="subtitle1" className={classes.label}>Level</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <AntTextField name="Alarm 1"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <AntTextField name="Alarm 2"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}/>
                <Grid item xs={12} sm={6} md={3} lg={2}/>
                <Grid item xs={12} sm={6} md={3} lg={2}/>
            </Grid>
            <Grid container className={classes.gridContainer} spacing={3} alignItems="center">
                <Grid item xs={12} sm={12} md={3} lg={2}>
                    <Typography variant="subtitle1" className={classes.label}>Zählrate</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <AntTextField name="Alarm 1"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <AntTextField name="Alarm 2"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <AntTextField name="Sigma *)"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <AntTextField name="Sigm min rate"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <AntSwitch target={"settings"} name="securityAlarm">Sicherheitsalarm</AntSwitch>
                </Grid>
            </Grid>
            <Grid container className={classes.gridContainer} spacing={3} alignItems="center">
                <Grid item xs={12} sm={12} md={3} lg={2}>
                    <Typography variant="subtitle1" className={classes.label}>Dosierung</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <AntTextField name="Alarm 1"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <AntTextField name="Alarm 2"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}/>
                <Grid item xs={12} sm={6} md={3} lg={2}/>
                <Grid item xs={12} sm={6} md={3} lg={2}/>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.paperTitle}>
                    <Typography variant="h6">Dosis</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" className={classes.label}>Level</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <AntTextField name="Alarm 1"/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <AntTextField name="Alarm 2"/>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.paperTitle}>
                    <Typography variant="h6">Alarmschwelle</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <AntSwitch target={"settings"} name="nichtAernderbar"/>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.paperTitle}>
                    <Typography variant="h6">Energieverhältnis</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <AntSwitch target={"settings"} name="Aktiv"/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <AntTextField name="Minimale Werte"/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <AntSlider target={"device"} name={"Empfindlichkeit Niederenergie"} max={100} min={0} step={10}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <AntSlider  target={"device"} name={"Empfindlichkeit Hochenergie"} max={100} min={0} step={10}/>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.paperTitle}>
                    <Typography variant="h6">Alarmsignalisierung</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <AntSwitch target={"settings"} name="Schallgeber"/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <AntSwitch target={"settings"} name="LED"/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <AntSwitch target={"settings"} name="Vibrator"/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <AntTextField name="Alarm haltezeit" disabled/>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default AlarmSettings;
