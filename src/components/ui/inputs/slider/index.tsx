import {createStyles, FormControl, FormHelperText, Slider, Theme, withStyles} from "@material-ui/core";
import React, {FunctionComponent} from "react";
import AntPaper from "../../surfaces/paper";
import {makeStyles} from "@material-ui/core/styles";
import AntLabel from "../label";

const useStyles = makeStyles(() =>
    createStyles({
        formControl: {
            width: "100%",
        }
    })
);

const PrettoSlider = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.secondary.main,
        height: 8,
        marginTop: 10
    },
    thumb: {
        height: 18,
        width: 18,
        backgroundColor: "#bdbdbd",
        border: '2px solid #bdbdbd',
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main
    },
    valueLabel: {
        left: 'calc(-60%)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 6,
        borderRadius: 4,
        backgroundColor: theme.palette.text.primary,
    },
}))(Slider);

type antSliderProps = {
    label: string;
    caption?: string;
    value?: number | number[];
    max: number;
    min: number;
    step: number | null;
    onChange?: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
}

const AntSlider: FunctionComponent<antSliderProps> = ({label, caption, value, max, min, step, onChange}) => {

    const classes = useStyles();

    return (
        <AntPaper>
            <FormControl className={classes.formControl}>
                <AntLabel>{label}</AntLabel>
                <PrettoSlider
                    value={value}
                    valueLabelDisplay="auto"
                    step={step}
                    min={min}
                    max={max}
                    onChange={onChange}
                />
                {caption && <FormHelperText>{caption}</FormHelperText>}
            </FormControl>
        </AntPaper>
    )
};

export default AntSlider;

