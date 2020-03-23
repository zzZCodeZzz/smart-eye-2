import React from "react";
import {
    createStyles,
    FormControl,
    Grid,
    InputLabel,
    Select,
    Slider,
    Switch,
    Theme,
    Typography
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            overflowX: "hidden",
            padding: 20,
        },
        container: {
            justifyContent: "center",
            padding: "10px 0",
        },
        formControl: {
            width: "100%",
            marginBottom: theme.spacing(3)
        },
        selectEmpty: {
            marginTop: theme.spacing(3),
        },
        timePicker: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        }
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
    date: Date | null;
    keyTones: boolean;
    keyLock: boolean;
    temperatureDisplay: string;
    showDisplay: boolean;
    reversible: boolean;
    graphicalView: boolean;
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
        date: new Date(),
        keyTones: false,
        keyLock: false,
        temperatureDisplay: "",
        showDisplay: false,
        reversible: false,
        graphicalView: false,
    });

    const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof state;
        setState({
            ...state,
            [name]: event.target.value,
        });
        console.table(state);
    };

    const handleSliderChange = (name: keyof typeof state) => (event: any, value: number | number[]) => {
        setState({
            ...state,
            [name]: value
        });
        console.table(state);
    };

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof state;
        console.log(`show ${name} before`, state[name]);
        setState({
            ...state,
            [name]: event.target.checked
        });
        console.log(`show ${name} after`, state[name]);
        console.table(state);
    };

    const handleDateChange = (date: Date | null) => {
        setState({
            ...state,
            date: date
        });
        console.table(state);
    };

    return (
        <div className={classes.root}>
            <Grid container className={classes.container} spacing={3}>
                <Grid item xs={12} md={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="language-select">Language</InputLabel>
                        <Select
                            native
                            value={state.language}
                            onChange={handleSelectChange}
                            inputProps={{
                                name: 'language',
                                id: 'language-select',
                            }}
                        >
                            <option aria-label="None" value=""/>
                            <option value="Deutsch">Deutsch</option>
                            <option value="English">English</option>
                            <option value="Français">Français</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="battery-type-select">Battery Type</InputLabel>
                        <Select
                            native
                            value={state.batteryType}
                            onChange={handleSelectChange}
                            inputProps={{
                                name: 'batteryType',
                                id: 'battery-type-select',
                            }}
                        >
                            <option aria-label="None" value=""/>
                            <option value="Rechargeable">Rechargeable</option>
                            <option value="Alkaline">Alkaline</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="acoustic-select">Acoustic indication</InputLabel>
                        <Select
                            native
                            value={state.acoustic}
                            onChange={handleSelectChange}
                            inputProps={{
                                name: 'acoustic',
                                id: 'acoustic-select',
                            }}
                        >
                            <option aria-label="None" value=""/>
                            <option value="None">None</option>
                            <option value="Finder">Finder</option>
                            <option value="Single impulse">Single impulse</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl className={classes.formControl}>
                        <Typography id="historyLog" gutterBottom>History Log</Typography>
                        <Slider
                            value={state.historyLog}
                            valueLabelDisplay="auto"
                            step={10}
                            min={0}
                            max={3600}
                            onChange={handleSliderChange("historyLog")}
                        />
                        <Typography variant="caption">0 = Save history manually</Typography>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container className={classes.container} spacing={3}>
                <Grid item xs={12} md={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="acoustic-select">Unit</InputLabel>
                        <Select
                            native
                            value={state.unit}
                            onChange={handleSelectChange}
                            inputProps={{
                                name: 'unit',
                                id: 'unit-select',
                            }}
                        >
                            <option aria-label="None" value=""/>
                            <option value="S-1">S-1</option>
                            <option value="SW/H">SW/H</option>
                            <option value="R/H">R/H</option>
                            <option value="REM/H">REM/H</option>
                            <option value="Level">Level</option>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="unit-dose-rate-select">Unit</InputLabel>
                        <Select
                            native
                            value={state.unitDoseRate}
                            onChange={handleSelectChange}
                            inputProps={{
                                name: 'unitDoseRate',
                                id: 'unit-dose-rate-select',
                            }}
                        >
                            <option aria-label="None" value=""/>
                            <option value="SW/H">SW/H</option>
                            <option value="R/H">R/H</option>
                            <option value="REM/H">REM/H</option>
                        </Select>
                    </FormControl>
                    <div>
                        <Typography>Show Unit</Typography>
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>Off</Grid>
                            <Grid item>
                                <Switch checked={state.showUnit} onChange={handleSwitchChange} name="showUnit"/>
                            </Grid>
                            <Grid item>On</Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12} md={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Pick date"
                                value={state.date}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Pick time"
                                value={state.date}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} md={3}>
                    <div>
                        <Typography>Key Tones</Typography>
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>Off</Grid>
                            <Grid item>
                                <Switch checked={state.keyTones} onChange={handleSwitchChange} name="keyTones"/>
                            </Grid>
                            <Grid item>On</Grid>
                        </Grid>
                    </div>
                    <div>
                        <Typography>Key Lock</Typography>
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>Off</Grid>
                            <Grid item>
                                <Switch checked={state.keyLock} onChange={handleSwitchChange} name="keyLock"/>
                            </Grid>
                            <Grid item>On</Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="temperature-display-select">Temperature display</InputLabel>
                        <Select
                            native
                            value={state.temperatureDisplay}
                            onChange={handleSelectChange}
                            inputProps={{
                                name: 'temperatureDisplay',
                                id: 'temperature-display-select',
                            }}
                        >
                            <option value="None">None</option>
                            <option value="Fahrenheit">Fahrenheit</option>
                            <option value="Celsius">Celsius</option>
                        </Select>
                    </FormControl>
                    <div>
                        <Typography>Show DR in CPS mode</Typography>
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>Off</Grid>
                            <Grid item>
                                <Switch checked={state.keyLock} onChange={handleSwitchChange} name="keyLock"/>
                            </Grid>
                            <Grid item>On</Grid>
                        </Grid>
                    </div>
                    <div>
                        <Typography>Reversible</Typography>
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>Off</Grid>
                            <Grid item>
                                <Switch checked={state.reversible} onChange={handleSwitchChange} name="reversible"/>
                            </Grid>
                            <Grid item>On</Grid>
                        </Grid>
                    </div>
                    <div>
                        <Typography>Graphical view</Typography>
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>Off</Grid>
                            <Grid item>
                                <Switch checked={state.graphicalView} onChange={handleSwitchChange} name="graphicalView"/>
                            </Grid>
                            <Grid item>On</Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
        ;
};

export default GeneralSettings;

