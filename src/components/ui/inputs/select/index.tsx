import React, {FunctionComponent} from "react";
import {createStyles, FormControl, InputLabel, Paper, Select, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

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
    label: string;
    value: string | number | null;
    options: {
        label: string | number | null;
        value: string | string[] | number;
    }[];
    inputProps: {
        name: string;
        id: string;
    };
    onChange?: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
}

const AntSelect: FunctionComponent<antSelectProps> = ({label, value, options, inputProps, onChange}): JSX.Element => {

    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor={inputProps.id}>{label}</InputLabel>
                <Select
                    native
                    value={value}
                    inputProps={inputProps}
                    onChange={onChange}
                >
                    {options.map(o => o ? <option value={o.value}>{o.label}</option> : null)}
                </Select>
            </FormControl>
        </Paper>
    )
};

export default AntSelect;
