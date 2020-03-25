import React, {FunctionComponent} from "react";
import {Grid, Switch} from "@material-ui/core";
import AntPaper from "../../surfaces/paper";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {updateDeviceLocalAndRemote} from "../../../../redux/device/radEyeDevicesSlice";
import {crazyToBool} from "../../../../mqtt/utils";
import AntLabel from "../label";

type AntSwitchProps = {
    name: string;
    value?: string | number | boolean;
    checkedLabel?: string;
    uncheckedLabel?: string;
}

const AntSwitch: FunctionComponent<AntSwitchProps> = ({name, value, checkedLabel = "on", uncheckedLabel = "off"}) => {

    const dispatch = useDispatch();
    const {t} = useTranslation();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => dispatch(
        updateDeviceLocalAndRemote(event.target.name, event.target.checked ? "1" : "0")
    );

    return (
        <AntPaper>
            <AntLabel>{t(name)}</AntLabel>
            <Grid component="label" container alignItems="center" justify={"space-around"} spacing={1}>
                <Grid item>{t(uncheckedLabel)}</Grid>
                <Grid item>
                    <Switch onChange={onChange} checked={crazyToBool(value)} name={name}/>
                </Grid>
                <Grid item>{t(checkedLabel)}</Grid>
            </Grid>
        </AntPaper>
    )
};

export default AntSwitch;
