import React from "react";
import {createStyles, Grid, Theme} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider,} from "@material-ui/pickers";
import {makeStyles} from "@material-ui/core/styles";
import AntSelect from "../../../ui/inputs/select";
import {useActiveDeviceFields} from "../../../../redux/device/deviceStoreSelectors";
import AntSwitch from "../../../ui/inputs/switch";
import AntSlider from "../../../ui/inputs/slider";

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

    const fields = useActiveDeviceFields(device => ({language: device.language}));

    return (
        <Grid container className={classes.container} spacing={3}>
            <Grid item xs={12} md={3}>
                <AntSelect
                    name="language"
                    value={fields?.language}
                    options={["german", "english", "français"]}
                />
            </Grid>
            <Grid item xs={12} md={3}>
                <AntSelect
                    name="batteryType"
                    value={state.batteryType}
                    options={["Rechargeable", "Alkaline"]}
                />
            </Grid>
            <Grid item xs={12} md={3}>
                <AntSelect
                    name="acoustic"
                    value={state.acoustic}
                    options={["None", "Finder", "Single impulse"]}
                />
            </Grid>
            <Grid item xs={12} md={3}>
                <AntSlider
                    label="History Log"
                    id="historyLog"
                    value={state.historyLog}
                    max={3600}
                    min={0}
                    step={10}
                    onChange={handleSliderChange("historyLog")}
                    caption="0 = Save history manually"/>
            </Grid>
            <Grid item xs={12} md={3}>
                <AntSelect
                    name="unit"
                    value={state.unit}
                    options={["S-1", "SW/H", "R/H", "REM/H", "Level"]}
                />
                <br/>
                <AntSelect
                    name="unitDoseRate"
                    value={state.unitDoseRate}
                    options={["SW/H", "R/H", "REM/H"]}
                />
                <br/>
                <AntSwitch
                    label="Show Unit"
                    checked={state.showUnit}
                    name="showUnit"
                    checkedLabel="On"
                    uncheckedLabel="Off"
                    onChange={handleSwitchChange}/>
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
                    onChange={handleSwitchChange}/>
                <br/>
                <AntSwitch
                    label="Key Lock"
                    checked={state.keyLock}
                    name="keyLock"
                    checkedLabel="On"
                    uncheckedLabel="Off"
                    onChange={handleSwitchChange}/>
            </Grid>
            <Grid item xs={12} md={3}>
                <AntSelect
                    name="temperatureDisplay"
                    value={state.temperatureDisplay}
                    options={["None","Fahrenheit", "Celsius"]}
                />
                <br/>
                <AntSwitch
                    label="Show DR in CPS mode"
                    checked={state.showDisplay}
                    name="showDisplay"
                    checkedLabel="On"
                    uncheckedLabel="Off"
                    onChange={handleSwitchChange}/>
                <br/>
                <AntSwitch
                    label="Reversible"
                    checked={state.reversible}
                    name="reversible"
                    checkedLabel="On"
                    uncheckedLabel="Off"
                    onChange={handleSwitchChange}/>
                <br/>
                <AntSwitch
                    label="Graphical view"
                    checked={state.graphicalView}
                    name="graphicalView"
                    checkedLabel="On"
                    uncheckedLabel="Off"
                    onChange={handleSwitchChange}/>
            </Grid>
        </Grid>
    );
};

export default GeneralSettings;

