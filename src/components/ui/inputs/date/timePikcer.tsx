import React, {FunctionComponent} from "react";
import {TimePicker as MuiTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import moment from "moment";
import momentUtils from "@date-io/moment";

import {useTranslation} from "react-i18next";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {useDispatch} from "react-redux";
import {updateDeviceLocalAndRemote} from "../../../../redux/device/radEyeDevicesSlice";
import AntLabel from "../label";

type TimePickerProps = {
    name: string;
    value?: string;
}

const TimePicker: FunctionComponent<TimePickerProps> = ({name, value}) => {

    const {t} = useTranslation();
    const dispatch = useDispatch();


    const onChange = (currentMoment: MaterialUiPickersDate) => {
        if (currentMoment) {
            dispatch(updateDeviceLocalAndRemote(name, currentMoment.format("YYYY-MM-DD HH:mm:ss")));
        }
    };

    return (
        <MuiPickersUtilsProvider utils={momentUtils} locale={"de"}>
            <AntLabel>{t("date_time")}</AntLabel>
            <MuiTimePicker
                variant="inline"
                label={t("pick_time")}
                value={moment(value)}
                onChange={onChange}
                ampm={false}
                orientation="landscape"
            />
        </MuiPickersUtilsProvider>
    )
};

export default TimePicker;
