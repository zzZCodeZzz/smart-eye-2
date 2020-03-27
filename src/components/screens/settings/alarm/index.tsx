import React, {Fragment} from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {createStyles, Grid} from "@material-ui/core";
import AlarmRate from "./sections/rate";
import AlarmDose from "./sections/dose";
import AlarmEnergyRate from "./sections/energyRatio";
import AlarmThreshold from "./sections/threshold";
import AlarmSignal from "./sections/signal";
import AntBox from "../../../ui/surfaces/box";

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
                <Grid item xs={12} md={6} component="section">
                    <AntBox>
                        <AlarmRate/>
                    </AntBox>
                </Grid>

                <Grid item xs={12} sm={6} md={3} component="section">
                    <AntBox>
                        <AlarmDose/>
                    </AntBox>
                </Grid>

                <Grid item xs={12} sm={6} md={3} component="section">

                        <AlarmThreshold/>
                </Grid>

                <Grid item xs={12} sm={6} component="section">
                    <AntBox>
                        <AlarmEnergyRate/>
                    </AntBox>
                </Grid>

                <Grid item xs={12} sm={6} component="section">
                    <AntBox>
                        <AlarmSignal/>
                    </AntBox>
                </Grid>
            </Grid>
        </Fragment>
    )
        ;
};

export default AlarmSettings;
