import React from "react";
import {createStyles, Grid, Theme} from "@material-ui/core";
import AntSwitch from "../../../../ui/inputs/switch";
import {H2} from "../../../../ui/typography";
import {makeStyles} from "@material-ui/core/styles";
import AntBox from "../../../../ui/surfaces/box";

const useStyles = makeStyles(({breakpoints}: Theme) =>
    createStyles({
        centralize: {
            [breakpoints.up("sm")]: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)"
            },
        },
        relative: {
            position: "relative",
        }
    })
);

const AlarmThreshold = () => {

    const classes = useStyles();

    return (
        <AntBox>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <H2>Alarmschwelle</H2>
                </Grid>
                <Grid item xs={12} sm={12} className={classes.centralize}>
                    <AntSwitch onChange={() => console.log("bla")} name="nichtAernderbar"/>
                </Grid>
            </Grid>
        </AntBox>
    );
};

export default AlarmThreshold;
