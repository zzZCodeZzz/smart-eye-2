import {createStyles, FormControl, FormHelperText, Slider, Typography} from "@material-ui/core";
import React, {FunctionComponent} from "react";
import AntPaper from "../../surfaces/paper";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        formControl: {
            width: "100%",
        },
        label: {
            transform: "translate(0, 1.5px) scale(0.75)",
            transformOrigin: "top left",
        }
    })
);

type antSliderProps = {
    label: string;
    id: string;
    caption?: string;
    value: number | number[];
    max: number;
    min: number;
    step: number | null;
    onChange?: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
}

const AntSlider: FunctionComponent<antSliderProps> = ({label, id, caption, value, max, min, step, onChange}) => {

    const classes = useStyles();

    return (
        <AntPaper>
            <FormControl className={classes.formControl}>
                <Typography id={id} className={classes.label}>{label}</Typography>
                <Slider
                    value={value}
                    valueLabelDisplay="auto"
                    step={step}
                    min={min}
                    max={max}
                    aria-labelledby={id}
                    onChange={onChange}
                />
                {caption && <FormHelperText>{caption}</FormHelperText>}
            </FormControl>
        </AntPaper>
    )
};

export default AntSlider;

