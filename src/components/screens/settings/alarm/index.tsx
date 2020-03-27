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
        },
        right: {
            [theme.breakpoints.up("md")]: {
                textAlign: "right",
            }
        },
        placeHolder: {
            [theme.breakpoints.down("sm")]: {
                display: "none"
            },
        }
    }),
);

const AlarmSettings = () => {

    const classes = useAlarmStyles();

    return (
        <Fragment>
            <Grid container className={classes.gridContainer} spacing={3}>
                <Grid item xs={12} md={12} component="section">
                    <AntPaper>
                        <AlarmRate/>
                    </AntPaper>
                </Grid>

                <Grid item xs={12} sm={6} lg={3} component="section">
                    <AntPaper>
                        <AlarmDose/>
                    </AntPaper>
                </Grid>

                <Grid item xs={12} sm={6} lg={3} component="section">
                    <AntPaper>
                        <AlarmThreshold/>
                    </AntPaper>
                </Grid>

                <Grid item xs={12} sm={6} lg={3} component="section">
                    <AntPaper>
                        <AlarmEnergyRate/>
                    </AntPaper>
                </Grid>

                <Grid item xs={12} sm={6} lg={3} component="section">
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
