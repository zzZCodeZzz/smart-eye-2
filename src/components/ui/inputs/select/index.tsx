import React, {FunctionComponent} from "react";
import {createStyles, FormControl, InputLabel, Select, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Maybe} from "../../../../redux/device/device.types";
import {useDispatch} from "react-redux";
import {updateDeviceLocalAndRemote} from "../../../../redux/device/radEyeDevicesSlice";
import {useTranslation} from "react-i18next";
import AntPaper from "../../surfaces/paper";

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

type SelectProps = {
    name: string;
    value: Maybe<string>;
    options: string[];
}

const AntSelect: FunctionComponent<SelectProps> = ({name, value, options}): JSX.Element => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const inputId = `${name}-select`;
    const {t} = useTranslation();

    const onChange = (event: React.ChangeEvent<any>) => dispatch(
        updateDeviceLocalAndRemote(event.target.name, event.target.value)
    );

    return (
        <AntPaper>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor={inputId}>{t(name)}</InputLabel>
                <Select native value={value} inputProps={{name: name, id: inputId}} onChange={onChange}>
                    {options.map(option => <option key={option} value={option}>{option}</option>)}
                </Select>
            </FormControl>
        </AntPaper>
    )
};

export default AntSelect;
