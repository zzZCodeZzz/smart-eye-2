import React, {FunctionComponent} from "react";
import {createStyles, FormControl, MenuItem, Select, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Maybe} from "../../../../redux/device/device.types";
import {useTranslation} from "react-i18next";
import {ConditionalBox} from "../../surfaces/box";
import AntLabel from "../label";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            width: "100%",
        },
        box: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        select: {
            textTransform: "uppercase",

            "&:after": {
                borderBottomColor: theme.palette.secondary.main
            }
        },
        option: {
            textTransform: "uppercase"
        }
    }),
);

type SelectProps = {
    name: string;
    label?: string; // used if key of device settings is not equal to its label
    value: Maybe<string>;
    options: string[];
    normalizeHeight?: boolean;
    withPaper?: boolean;
    onChange: (event: React.ChangeEvent<any>) => void;
}

const AntSelect: FunctionComponent<SelectProps> = ({name, label, onChange, value, options, normalizeHeight, withPaper}) => {

    const classes = useStyles();
    const {t} = useTranslation();

    return (
        <ConditionalBox condition={withPaper} normalizeHeight={normalizeHeight}>
            <FormControl className={classes.formControl}>
                <AntLabel>{t(label ? label : name)}</AntLabel>
                <Select
                    value={value ? value : ""}
                    inputProps={{name: name}}
                    onChange={onChange}
                    className={classes.select}
                >
                    {options.map(option =>
                        <MenuItem
                            key={option}
                            value={option}
                            className={classes.option}>{t(option)}
                        </MenuItem>)}
                </Select>
            </FormControl>
        </ConditionalBox>
    )
};

export default AntSelect;
