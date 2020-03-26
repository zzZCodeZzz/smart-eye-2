import React, {FunctionComponent} from "react";
import {createStyles, Grid, Switch} from "@material-ui/core";
import {ConditionalPaper} from "../../surfaces/paper";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {updateDeviceLocalAndRemote} from "../../../../redux/device/radEyeDevicesSlice";
import {crazyToBool} from "../../../../mqtt/utils";
import AntLabel from "../label";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        checkLabel: {
            textTransform: "uppercase"
        }
    })
);

type AntSwitchProps = {
    name: string;
    value?: string | number | boolean;
    label?: string;
    checkedLabel?: string;
    uncheckedLabel?: string;
    target: "settings" | "device";
    withPaper?: boolean;
}

const AntSwitch: FunctionComponent<AntSwitchProps> = ({name, label, target, value, checkedLabel = "on", uncheckedLabel = "off", withPaper}) => {

    const dispatch = useDispatch();
    const {t} = useTranslation();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (target === "device") {
            dispatch(updateDeviceLocalAndRemote(event.target.name, event.target.checked ? "1" : "0"))
        } else if (target === "settings") {
            console.log("message for settings");
        }
    };

    const classes = useStyles();

    return (
        <ConditionalPaper condition={withPaper}>
            <AntLabel>{t(label ? label : name)}</AntLabel>
            <Grid component="label" container alignItems="center" justify={"space-around"} spacing={1}>
                <Grid item className={classes.checkLabel}>{t(uncheckedLabel)}</Grid>
                <Grid item>
                    <Switch onChange={onChange} checked={crazyToBool(value)} name={name}/>
                </Grid>
                <Grid item className={classes.checkLabel}>{t(checkedLabel)}</Grid>
            </Grid>
        </ConditionalPaper>
    )
};

export default AntSwitch;
