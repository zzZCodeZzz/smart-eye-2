import React, {FunctionComponent} from "react";
import {createStyles, Grid, styled, Switch, Theme, Typography} from "@material-ui/core";
import AntPaper from "../../surfaces/paper";
import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {updateDeviceLocalAndRemote} from "../../../../redux/device/radEyeDevicesSlice";
import {crazyToBool} from "../../../../mqtt/utils";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        label: {
            transform: "translate(0, 1.5px) scale(0.75)",
            transformOrigin: "top left",
        }
    }),
);

const RedSwitch = styled(Switch)({
    switchBase: {
        color: red[300],
        '&$checked': {
            color: red[500],
        },
        '&$checked + $track': {
            backgroundColor: red[500],
        },
    },
    checked: {},
    track: {},
});

type AntSwitchProps = {
    name: string;
    value?: string | number | boolean;
    checkedLabel?: string;
    uncheckedLabel?: string;
}

const AntSwitch: FunctionComponent<AntSwitchProps> = ({name, value, checkedLabel = "on", uncheckedLabel = "off"}) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => dispatch(
        updateDeviceLocalAndRemote(event.target.name, event.target.checked ? "1" : "0")
    );

    return (
        <AntPaper>
            <Typography className={classes.label}>{t(name)}</Typography>
            <Grid component="label" container alignItems="center" justify={"space-around"} spacing={1}>
                <Grid item>{t(uncheckedLabel)}</Grid>
                <Grid item>
                    <RedSwitch onChange={onChange} checked={crazyToBool(value)} name={name}/>
                </Grid>
                <Grid item>{t(checkedLabel)}</Grid>
            </Grid>
        </AntPaper>
    )
};

export default AntSwitch;
