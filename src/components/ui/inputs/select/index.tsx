import React, {FunctionComponent} from "react";
import {createStyles, FormControl, InputLabel, Paper, Select, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Maybe} from "../../../../redux/device/device.types";
import {useDispatch} from "react-redux";
import {updateDeviceLocalAndRemote} from "../../../../redux/device/radEyeDevicesSlice";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            width: "100%",
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

type antSelectProps = {
    name: string;
    value: Maybe<string>;
    options: string[];
    onChange?: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
}

const AntSelect: FunctionComponent<antSelectProps> = ({name, value, options}): JSX.Element => {

    const classes = useStyles();

    const dispatch = useDispatch();

    const inputId = `${name}-select`;

    const onChange = (event: React.ChangeEvent<any>) => {
        dispatch(updateDeviceLocalAndRemote(event.target.name, event.target.value))
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor={inputId}>{name}</InputLabel>
            <Select
                native
                value={value}
                inputProps={{name: name, id: inputId}}
                onChange={onChange}
            >
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </Select>
        </FormControl>
    )
};

export default AntSelect;
