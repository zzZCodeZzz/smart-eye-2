import React, {Fragment} from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {createStyles, Grid} from "@material-ui/core";
import AlarmRate from "./sections/rate";
import AlarmDose from "./sections/dose";
import AlarmEnergyRate from "./sections/energyRatio";
import AlarmThreshold from "./sections/threshold";
import AlarmSignal from "./sections/signal";
import AntPaper from "../../../ui/surfaces/paper";

export const useAlarmStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridContainer: {
            justifyContent: "center",
            padding: `0 ${theme.spacing(1)}px`,
        },
        label: {
            fontWeight: 500,
            textAlign: "right",
            paddingTop: `${theme.spacing(3)}px!important`,
            paddingBottom: `${theme.spacing(0)}px!important`,
            [theme.breakpoints.down("md")]: {
                textAlign: "center",
            }
        },
        paperTitle: {
            padding: 0,
            margin: 0
        },
        placeHolder: {
            [theme.breakpoints.down("sm")]: {
                display: "none"
            },
        },
        normalizeHeight1: {
            [theme.breakpoints.up("sm")]: {
                minHeight: "17rem",
            },
            [theme.breakpoints.down("sm")]: {
                minHeight: "9rem",
            },
        }
    }),
);

const AlarmSettings = () => {

    const classes = useAlarmStyles();

    return (
        <Fragment>
            <AntPaper>
                <Grid container className={classes.gridContainer} spacing={3} alignItems="center">
                    <AlarmRate/>
                </Grid>
            </AntPaper><br/>

            <Grid container className={classes.gridContainer} spacing={3} alignItems="center">
                <Grid item xs={12} sm={6}>

                    <AntPaper>
                        <AlarmDose/>

                    </AntPaper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AntPaper>
                        <AlarmThreshold/>
                    </AntPaper>
                </Grid>
            </Grid>


            <Grid container className={classes.gridContainer} spacing={3} alignItems="center">
                <Grid item xs={12} sm={6}>
                    <AntPaper>
                        <AlarmEnergyRate/>
                    </AntPaper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <AntPaper>
                        <AlarmSignal/>
                    </AntPaper>
                </Grid>
            </Grid>
        </Fragment>
    )
        ;
};

export default AlarmSettings;
