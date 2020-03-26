import React from "react";
import {createStyles, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AntSelect from "../../../ui/inputs/select";
import {useActiveDeviceFields} from "../../../../redux/device/deviceStoreSelectors";
import AntSwitch from "../../../ui/inputs/switch";
import AntSlider from "../../../ui/inputs/slider";
import DateTimePicker from "../../../ui/inputs/date/dateTimePicker";
import SyncTimeButton from "../../../ui/inputs/button/synTimeButton";

const useStyles = makeStyles(() =>
    createStyles({
        gridContainer: {
            justifyContent: "center",
            padding: "10px 0",
        }
    }),
);

const GeneralSettings = () => {

    const classes = useStyles();

    const fields = useActiveDeviceFields(device => ({
        language: device.language,
        reversible: device.reversible,
        battery_type: device.battery_type,
        accustic_view: device.accustic_view,
        dose_rate_display_unit: device.dose_rate_display_unit,
        dose_rate_cps: device.dose_rate_cps,
        temperature_display: device.temperature_display,
        beep_on_key: device.beep_on_key,
        keyboard_lock: device.keyboard_lock,
        graphical_view: device.graphical_view,
        show_dr_in_cps_mode: device.show_dr_in_cps_mode,
        pick_date: device.pick_date,
        pick_time: device.pick_time,
        history_log_time: device.history_log_time
    }));

    return (
        <Grid container className={classes.gridContainer} spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
                <AntSelect
                    name="language"
                    value={fields.language}
                    options={["german", "english", "français"]}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AntSelect
                    name="battery_type"
                    value={fields.battery_type}
                    options={["battery_rechargeable", "battery_alkaline"]}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AntSelect
                    name="accustic_view"
                    value={fields.accustic_view}
                    options={["none", "finder", "single_impulse"]}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AntSlider
                    name="history_log_time"
                    value={fields.history_log_time}
                    target={"device"}
                    max={3600}
                    min={0}
                    step={10}
                    caption="zero_history_save_manual"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AntSelect
                    name="dose_rate_display_unit"
                    value={fields.dose_rate_display_unit}
                    options={["S-1", "SW/H", "R/H", "REM/H", "Level"]}
                />
                <br/>
                <AntSelect
                    name="dose_rate_cps"
                    value={fields.dose_rate_cps}
                    options={["SW/H", "R/H", "REM/H"]}
                />
                <br/>
                <AntSwitch
                    name="show_dr_in_cps_mode"
                    value={fields.show_dr_in_cps_mode}
                    target={"device"}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <DateTimePicker
                    name={"pick_date"}
                    value={fields.pick_date}
                />
                <br/>
                <SyncTimeButton/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AntSwitch
                    name="beep_on_key"
                    value={fields.beep_on_key}
                    target={"device"}
                />
                <br/>
                <AntSwitch
                    name="keyboard_lock"
                    value={fields.keyboard_lock}
                    target={"device"}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AntSelect
                    name="temperature_display"
                    value={fields.temperature_display}
                    options={["none", "celsius", "fahrenheit"]}
                />
                <br/>
                <br/>
                <AntSwitch
                    name="reversible"
                    value={fields.reversible}
                    target={"device"}
                />
                <br/>
                <AntSwitch
                    name="graphical_view"
                    value={fields.graphical_view}
                    target={"device"}
                />
            </Grid>
        </Grid>
    );
};

export default GeneralSettings;
