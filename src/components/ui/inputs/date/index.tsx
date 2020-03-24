import React, {CSSProperties, FunctionComponent} from "react";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import {Moment} from "moment";

type CommonDatePickerProps = {
    label: string;
    value: Moment | null;
    onSelectDate: (date: Moment | null) => void;
    inputStyle?: CSSProperties;
    minDate?: Moment;
    maxDate?: Moment;
    maxDateMessage?: string;
    shouldDisableDate?: (date: Moment | null) => boolean;
    minDateMessage?: string;
    error?: boolean;
    errorText?: string;
    disableFuture?: boolean;
    disablePast?: boolean;
    openTo?: "date" | "year" | "month";
    views?: Array<"year" | "date" | "month">;
    autoOk?: boolean;
};

const DatePicker: FunctionComponent<CommonDatePickerProps> = (
    {autoOk, openTo, views, label, value, onSelectDate, inputStyle, minDateMessage, shouldDisableDate, minDate, maxDate, maxDateMessage, error, errorText, disableFuture, disablePast}) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            id="date-picker-dialog"
            label={label}
            format="DD.MM.YYYY"
            minDate={minDate}
            maxDate={maxDate}
            autoOk={autoOk}
            minDateMessage={minDateMessage}
            maxDateMessage={maxDateMessage}
            shouldDisableDate={shouldDisableDate}
            value={value}
            invalidDateMessage={"ungültig"}
            onChange={onSelectDate}
            style={{width: "100%", ...inputStyle}}
            error={error}
            helperText={errorText}
            disableFuture={disableFuture}
            disablePast={disablePast}
            openTo={openTo}
            views={views}
        />
    </MuiPickersUtilsProvider>
);


export default DatePicker;
