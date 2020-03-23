import React from "react";
import {createStyles, FormControl, Grid, InputLabel, Select, Slider, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            overflowX: "hidden"
        },
        container: {
            padding: 20,
            justifyContent: "center"
        },
        formControl: {
            width: "100%",
        },
        selectEmpty: {
            marginTop: theme.spacing(3),
        },
    }),
);

type generalSettingsState = {
    language: string;
    batteryType: string;
    acoustic: string;
    historyLog: number | number[];
    unit: string;
    unitDoseRate: string;
    showUnit: boolean;
    date: string;
    time: string;
    keyTones: boolean;
    keyLock: boolean;
    display: string;
    showDisplay: boolean;
    upturnedDisplay: boolean;
    graphicRepresentation: boolean;
}

const GeneralSettings = (): JSX.Element => {

    const classes = useStyles();

    const [state, setState] = React.useState<generalSettingsState>({
            language: "",
            batteryType: "",
            acoustic: "",
            historyLog: 0,
            unit: "",
            unitDoseRate: "",
            showUnit: false,
            date: "",
            time: "",
            keyTones: false,
            keyLock: false,
            display: "",
            showDisplay: false,
            upturnedDisplay: false,
            graphicRepresentation: false,
        })
    ;

    const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof state;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const handleSliderChange = (name: keyof typeof state) => (event: any, value: number | number[]) => {
        setState({
            ...state,
            [name]: value
        });
    };

    return (
        <div className={classes.root}>
            <Grid container className={classes.container} spacing={5}>
                <Grid container item xs={12} md={3} spacing={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="language-native-simple">Language</InputLabel>
                        <Select
                            native
                            value={state.language}
                            onChange={handleSelectChange}
                            inputProps={{
                                name: 'language',
                                id: 'language-native-simple',
                            }}
                        >
                            <option aria-label="None" value=""/>
                            <option value={10}>Deutsch</option>
                            <option value={20}>English</option>
                            <option value={30}>Français</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid container item xs={12} md={3} spacing={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="battery-type-native-simple">Battery Type</InputLabel>
                        <Select
                            native
                            value={state.batteryType}
                            onChange={handleSelectChange}
                            inputProps={{
                                name: 'batteryType',
                                id: 'battery-type-native-simple',
                            }}
                        >
                            <option aria-label="None" value=""/>
                            <option value={10}>Rechargeable</option>
                            <option value={20}>Alkaline</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid container item xs={12} md={3} spacing={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="acoustic-native-simple">Acoustic indication</InputLabel>
                        <Select
                            native
                            value={state.acoustic}
                            onChange={handleSelectChange}
                            inputProps={{
                                name: 'acoustic',
                                id: 'acoustic-native-simple',
                            }}
                        >
                            <option aria-label="None" value=""/>
                            <option value={10}>None</option>
                            <option value={20}>Finder</option>
                            <option value={30}>Single impulse</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid container item xs={12} md={3} spacing={3}>
                    <FormControl className={classes.formControl}>
                        <Typography id="historyLog" gutterBottom>
                            History Log
                        </Typography>
                        <Slider
                            value={state.historyLog}
                            valueLabelDisplay="auto"
                            step={10}
                            min={0}
                            max={3600}
                            onChange={handleSliderChange("historyLog")}
                        />
                        <Typography>0 = Save history manually</Typography>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    )
        ;
};

export default GeneralSettings;

