import React, {FunctionComponent} from "react";
import {createStyles, Grid, Switch} from "@material-ui/core";
import {ConditionalBox} from "../../surfaces/box";
import {useTranslation} from "react-i18next";
import {crazyToBool} from "../../../../mqtt/utils";
import AntLabel from "../label";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        checkLabel: {
            textTransform: "uppercase"
        }
    })
);

type AntSwitchProps = {
    name: string;
    value?: string | number | boolean;
    label?: string;
    checkedLabel?: string;
    uncheckedLabel?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    withPaper?: boolean;
}

const AntSwitch: FunctionComponent<AntSwitchProps> = ({name, label, onChange, value, checkedLabel = "on", uncheckedLabel = "off", withPaper}) => {

    const {t} = useTranslation();
    const classes = useStyles();

    return (
        <ConditionalBox condition={withPaper}>
            <AntLabel>{t(label ? label : name)}</AntLabel>
            <Grid component="label" container alignItems="center" justify={"center"} spacing={1}>
                <Grid item className={classes.checkLabel}>{t(uncheckedLabel)}</Grid>
                <Grid item>
                    <Switch
                        onChange={onChange}
                        checked={crazyToBool(value)}
                        name={name}
                    />
                </Grid>
                <Grid item className={classes.checkLabel}>{t(checkedLabel)}</Grid>
            </Grid>
        </ConditionalBox>
    )
};

export default AntSwitch;
