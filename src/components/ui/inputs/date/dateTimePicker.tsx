import React, {FunctionComponent} from "react";
import {DateTimePicker as MuiDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import moment from "moment";
import momentUtils from "@date-io/moment";

import {useTranslation} from "react-i18next";
import AntLabel from "../label";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";

type DatePickerProps = {
    name: string;
    value?: string;
    onChange: (time: MaterialUiPickersDate) => void;
}

const DateTimePicker: FunctionComponent<DatePickerProps> = ({name, value, onChange}) => {

    const {t} = useTranslation();

    return (
        <MuiPickersUtilsProvider utils={momentUtils} locale={"de"}>
            <AntLabel>{t(name)}</AntLabel>
            <MuiDateTimePicker
                autoOk
                ampm={false}
                value={moment(value)}
                onChange={onChange}
                fullWidth
                format={"DD.MM.YYYY - HH:mm"}
            />
        </MuiPickersUtilsProvider>
    )
};

export default DateTimePicker;
