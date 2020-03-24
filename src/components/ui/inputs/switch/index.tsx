import React, {FunctionComponent} from "react";
import {createStyles, Grid, styled, Switch, Theme, Typography} from "@material-ui/core";
import AntPaper from "../../surfaces/paper";
import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import {useTranslation} from "react-i18next";

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

type antSwitchProps = {
    label: string;
    checked: boolean;
    checkedLabel?: string;
    uncheckedLabel?: string;
    name: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const AntSwitch: FunctionComponent<antSwitchProps> = ({label, checked, name, onChange,
                                                          checkedLabel = "on", uncheckedLabel = "off"}): JSX.Element => {

    const classes = useStyles();

    const {t} = useTranslation();

    return (
        <AntPaper>
            <Typography className={classes.label}>{t(name)}</Typography>
            <Grid component="label" container alignItems="center" justify={"space-around"} spacing={1}>
                <Grid item>{t(uncheckedLabel)}</Grid>
                <Grid item>
                    <RedSwitch checked={checked} onChange={onChange} name={name}/>
                </Grid>
                <Grid item>{t(checkedLabel)}</Grid>
            </Grid>
        </AntPaper>
    )
};

export default AntSwitch;
