import React from "react";
import {createStyles, Grid, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AntSelect from "../../../ui/inputs/select";
import {useActiveDeviceFields} from "../../../../redux/device/deviceStoreSelectors";
import AntSwitch from "../../../ui/inputs/switch";
import AntSlider from "../../../ui/inputs/slider";
import DatePicker from "../../../ui/inputs/date/datePicker";

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

const GeneralSettings = () => {

    const classes = useStyles();

    const fields = useActiveDeviceFields(device => ({
        language: device.language,
        reversible: device.reversible,
        batteryType: device.batteryType,
        acoustic: device.acoustic,
        unit: device.unit,
        unitDoseRate: device.unitDoseRate,
        temperatureDisplay: device.temperatureDisplay,
        keyTones: device.keyTones,
        keyLock: device.keyLock,
        showDisplay: device.showDisplay,
        graphicalView: device.graphicalView,
        showUnit: device.showUnit,
        // Todo manu klären ob das naming so kommt
        pick_date: device.pick_date,
        pick_time: device.pick_time,
    }));

    return (
        <Grid container className={classes.container} spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
                <AntSelect name="language" value={fields.language} options={["german", "english", "français"]}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AntSelect name="batteryType" value={fields.batteryType} options={["Rechargeable", "Alkaline"]}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AntSelect name="acoustic" value={fields.acoustic} options={["None", "Finder", "Single impulse"]}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AntSlider
                    label="History Log"
                    value={50}
                    max={3600}
                    min={0}
                    step={10}
                    caption="0 = Save history manually"
                />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
                <AntSelect name="unit" value={fields.unit} options={["S-1", "SW/H", "R/H", "REM/H", "Level"]}/>
                <br/>
                <AntSelect name="unitDoseRate" value={fields.unitDoseRate} options={["SW/H", "R/H", "REM/H"]}/>
                <br/>
                <AntSwitch name="showUnit" value={fields.showUnit}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                {/*<MuiPickersUtilsProvider utils={momentUtils}>*/}
                {/*    <DatePicker*/}
                {/*        label={t("pick_date")}*/}
                {/*        value={moment()}*/}
                {/*        onChange={() => console.log("ayay")}*/}
                {/*        animateYearScrolling*/}
                {/*    />*/}
                {/*    <TimePicker*/}
                {/*        variant="inline"*/}
                {/*        label={t("pick_time")}*/}
                {/*        orientation="landscape"*/}
                {/*        value={moment()}*/}
                {/*        onChange={()=> console.log("hamasdf")}*/}
                {/*    />*/}
                {/*</MuiPickersUtilsProvider>*/}
                <DatePicker name={"pick_date"} value={fields.pick_date}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AntSwitch name="keyTones" value={fields.keyTones}/>
                <br/>
                <AntSwitch name="keyLock" value={fields.keyLock}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AntSelect
                    name="temperatureDisplay"
                    value={fields.temperatureDisplay}
                    options={["None", "Fahrenheit", "Celsius"]}
                />
                <br/>
                <AntSwitch name="showDisplay" value={fields.showDisplay}/>
                <br/>
                <AntSwitch name="reversible" value={fields.reversible}/>
                <br/>
                <AntSwitch name="graphicalView" value={fields.graphicalView}/>
            </Grid>
        </Grid>
    );
};

export default GeneralSettings;
