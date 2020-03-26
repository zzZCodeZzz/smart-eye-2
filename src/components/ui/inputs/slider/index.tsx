import {createStyles, FormControl, FormHelperText, Slider, Theme, withStyles} from "@material-ui/core";
import React, {FunctionComponent} from "react";
import {ConditionalPaper} from "../../surfaces/paper";
import {makeStyles} from "@material-ui/core/styles";
import AntLabel from "../label";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {updateDeviceLocalAndRemote} from "../../../../redux/device/radEyeDevicesSlice";

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
    name: string;
    caption?: string;
    value?: string;
    max: number;
    min: number;
    step?: number | null;
    onChange?: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
    target: "settings" | "device";
    normalizeHeight?: boolean;
    withPaper?: boolean;
}

const AntSlider: FunctionComponent<antSliderProps> = ({name, target, caption, value, max, min, step, normalizeHeight, withPaper = true}) => {

    const classes = useStyles();
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const onChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        if(target === "device") {
            dispatch(updateDeviceLocalAndRemote(name, String(value)));
        } else if(target === "settings") {
            console.log("updateSttings");
        }
    };


    return (
        <ConditionalPaper condition={withPaper} normalizeHeight={normalizeHeight}>
            <FormControl className={classes.formControl}>
                <AntLabel>{t(name)}</AntLabel>
                <PrettoSlider
                    value={Number(value)}
                    valueLabelDisplay="auto"
                    name={name}
                    min={min}
                    max={max}
                    step={step}
                    onChange={onChange}
                />
                {caption && <FormHelperText>{t(caption)}</FormHelperText>}
            </FormControl>
        </ConditionalPaper>
    )
};

export default AntSlider;

