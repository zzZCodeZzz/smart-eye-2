import {createStyles, FormControl, FormHelperText, Slider} from "@material-ui/core";
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
                <Slider
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

