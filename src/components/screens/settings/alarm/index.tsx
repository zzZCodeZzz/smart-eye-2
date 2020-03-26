import React, {Fragment} from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {createStyles} from "@material-ui/core";
import AlarmRate from "./alarmRate";
import AlarmDose from "./alarmDose";
import AlarmThreshold from "./alarmThreshold";
import AlarmEnergyRate from "./alarmEnergyRatio";
import AlarmSignal from "./alarmSignal";

export const useAlarmStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridContainer: {
            justifyContent: "center",
            padding: `0 ${theme.spacing(1)}px`,
        },
        label: {
            fontWeight: 500,
            textAlign: "right",
            [theme.breakpoints.down("md")]: {
                textAlign: "center",
                paddingTop: `${theme.spacing(3)}px!important`,
                paddingBottom: `${theme.spacing(0)}px!important`
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
        }
    }),
);

const AlarmSettings = () => {

    return (
        <Fragment>
            <AlarmRate /><br />

            <AlarmDose /><br />

            <AlarmThreshold /><br />

            <AlarmEnergyRate /><br />

            <AlarmSignal />
        </Fragment>
    );
};

export default AlarmSettings;
