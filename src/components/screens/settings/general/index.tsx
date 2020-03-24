import React from "react";
import {createStyles, FormControl, Grid, Slider, Theme, Typography} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider,} from "@material-ui/pickers";
import {makeStyles} from "@material-ui/core/styles";
import AntSelect from "../../../ui/inputs/select";
import {useActiveDeviceFields} from "../../../../redux/device/deviceStoreSelectors";
import AntSwitch from "../../../ui/inputs/switch";

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

const GeneralSettings = () => {

    const classes = useStyles();

    const fields = useActiveDeviceFields(device => ({language: device.language}));


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
    };

    const handleSliderChange = (name: keyof typeof state) => (event: any, value: number | number[]) => {
        setState({
            ...state,
            [name]: value
        });
    };

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof state;
        setState({
            ...state,
            [name]: event.target.checked
        });
    };

    const handleDateChange = (date: Date | null) => {
        setState({
            ...state,
            date: date
        });
    };

    // const bla = useActiveDeviceField(device => device.language);

    // const dafq = useSelector((state: RootState) => state.devices && state.devices.devices && state.devices.activeDevice
    //     ? state.devices?.devices[state.devices.activeDevice]
    //     : null);
    //
    // const fields = useActiveDeviceFields(device => ({language: device.language}));

    // console.log("FfFFF", fields);

    return (
        <div className={classes.root}>
            <Grid container className={classes.container} spacing={3}>

                <Grid item xs={12} md={3}>
                    <AntSelect
                        label="Language"
                        value={state.language}
                        options={[
                            {value: "Deutsch", label: "Deutsch",},
                            {value: "English", label: "English",},
                            {value: "Français", label: "Français",}
                        ]}
                        inputProps={{
                            name: 'language',
                            id: 'language-select',
                        }}
                        onChange={handleSelectChange} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <AntSelect
                        label="Battery Type"
                        value={state.batteryType}
                        options={[
                            {value: "Rechargeable", label: "Rechargeable",},
                            {value: "Alkaline", label: "Alkaline",}
                        ]}
                        inputProps={{
                            name: 'batteryType',
                            id: 'battery-type-select',
                        }}
                        onChange={handleSelectChange} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <AntSelect
                        label="Acoustic indication"
                        value={state.acoustic}
                        options={[
                            {value: "None", label: "None",},
                            {value: "Finder", label: "Finder",},
                            {value: "Single impulse", label: "Single impulse",}
                        ]}
                        inputProps={{
                            name: 'acoustic',
                            id: 'acoustic-select',
                        }}
                        onChange={handleSelectChange} />
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
                        {/*<FormHelperText>Be careful</FormHelperText>*/}
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                    <AntSelect
                        label="Unit"
                        value={state.unit}
                        options={[
                            {value: "S-1", label: "S-1",},
                            {value: "SW/H", label: "SW/H",},
                            {value: "R/H", label: "R/H",},
                            {value: "REM/H", label: "REM/H",},
                            {value: "Level", label: "Level",}
                        ]}
                        inputProps={{
                            name: 'unit',
                            id: 'unit-select',
                        }}
                        onChange={handleSelectChange} />
                    <br />
                    <AntSelect
                        label="Unit dose rate"
                        value={state.unitDoseRate}
                        options={[
                            {value: "SW/H", label: "SW/H",},
                            {value: "R/H", label: "R/H",},
                            {value: "REM/H", label: "REM/H",}
                        ]}
                        inputProps={{
                            name: 'unitDoseRate',
                            id: 'unit-dose-rate-select',
                        }}
                        onChange={handleSelectChange} />
                    <br />
                    <AntSwitch
                        label="Show Unit"
                        checked={state.showUnit}
                        name="showUnit"
                        checkedLabel="On"
                        uncheckedLabel="Off"
                        onChange={handleSwitchChange} />
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
                    {console.table(state)}
                </Grid>
                <Grid item xs={12} md={3} spacing={5}>
                    <AntSwitch
                        label="Key Tones"
                        checked={state.keyTones}
                        name="keyTones"
                        checkedLabel="On"
                        uncheckedLabel="Off"
                        onChange={handleSwitchChange} />
                    <br />
                    <AntSwitch
                        label="Key Lock"
                        checked={state.keyLock}
                        name="keyLock"
                        checkedLabel="On"
                        uncheckedLabel="Off"
                        onChange={handleSwitchChange} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <AntSelect
                        label="Temperature display"
                        value={state.temperatureDisplay}
                        options={[
                            {value: "None", label: "None",},
                            {value: "Fahrenheit", label: "Fahrenheit",},
                            {value: "Celsius", label: "Celsius",}
                        ]}
                        inputProps={{
                            name: 'temperatureDisplay',
                            id: 'temperature-display-select',
                        }}
                        onChange={handleSelectChange} />
                    <br />
                    <AntSwitch
                        label="Show DR in CPS mode"
                        checked={state.showDisplay}
                        name="showDisplay"
                        checkedLabel="On"
                        uncheckedLabel="Off"
                        onChange={handleSwitchChange} />
                    <br />
                    <AntSwitch
                        label="Reversible"
                        checked={state.reversible}
                        name="reversible"
                        checkedLabel="On"
                        uncheckedLabel="Off"
                        onChange={handleSwitchChange} />
                    <br />
                    <AntSwitch
                        label="Graphical view"
                        checked={state.graphicalView}
                        name="graphicalView"
                        checkedLabel="On"
                        uncheckedLabel="Off"
                        onChange={handleSwitchChange} />
                </Grid>
            </Grid>
        </div>
    );
};

export default GeneralSettings;

