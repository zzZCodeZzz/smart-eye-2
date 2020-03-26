import React, {FunctionComponent} from "react";
import {MuiPickersUtilsProvider, DateTimePicker as MuiDateTimePicker} from "@material-ui/pickers";
import moment from "moment";
import momentUtils from "@date-io/moment";

import {useTranslation} from "react-i18next";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {useDispatch} from "react-redux";
import {updateDeviceLocalAndRemote} from "../../../../redux/device/radEyeDevicesSlice";
import AntLabel from "../label";

type DatePickerProps = {
    name: string;
    value?: string;
}

const DateTimePicker: FunctionComponent<DatePickerProps> = ({name, value}) => {

    const {t} = useTranslation();
    const dispatch = useDispatch();


    const onChange = (currentMoment: MaterialUiPickersDate) => {
        if (currentMoment) {
            dispatch(updateDeviceLocalAndRemote(name, currentMoment.format("YYYY-MM-DD HH:mm:ss")))
        }
    };

    return (
        <MuiPickersUtilsProvider utils={momentUtils} locale={"de"}>
            <AntLabel>{t("date_time")}</AntLabel>
            <MuiDateTimePicker
                autoOk
                ampm={false}
                value={moment(value)}
                onChange={onChange}
                fullWidth
                format={"DD.MM.YYYY - HH:mm" }
            />
        </MuiPickersUtilsProvider>
    )
};

export default DateTimePicker;
