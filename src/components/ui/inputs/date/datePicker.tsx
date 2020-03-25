import React, {FunctionComponent} from "react";
import {DatePicker as MuiDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import moment from "moment";
import momentUtils from "@date-io/moment";

import {useTranslation} from "react-i18next";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {useDispatch} from "react-redux";
import {updateDeviceLocalAndRemote} from "../../../../redux/device/radEyeDevicesSlice";

type DatePickerProps = {
    name: string;
    value?: string;
}

const DatePicker: FunctionComponent<DatePickerProps> = ({name, value}) => {

    const {t} = useTranslation();
    const dispatch = useDispatch();


    const onChange = (currentMoment: MaterialUiPickersDate) => {
        if (currentMoment) {
            dispatch(updateDeviceLocalAndRemote(name, currentMoment.format("YYYY-MM-DD HH:mm:ss")))
        }
    };

    return (
        <MuiPickersUtilsProvider utils={momentUtils} locale={"de"}>
            <MuiDatePicker
                label={t(name)}
                value={moment(value)}
                autoOk={true}
                onChange={onChange}
                animateYearScrolling
                format={"DD.MM.YYYY"}
                openTo={"year"}
                views={["year", "month", "date"]}
            />
        </MuiPickersUtilsProvider>
    )
};

export default DatePicker;
