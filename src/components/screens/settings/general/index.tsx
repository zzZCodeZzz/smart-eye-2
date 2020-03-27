import React from "react";
import {createStyles, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AntSelect from "../../../ui/inputs/select";
import {useGeneralDeviceSettingsSelector} from "../../../../redux/device/deviceStoreSelectors";
import AntSwitch from "../../../ui/inputs/switch";
import AntSlider from "../../../ui/inputs/slider";
import DateTimePicker from "../../../ui/inputs/date/dateTimePicker";
import SyncTimeButton from "../../../ui/inputs/button/synTimeButton";
import AntBox from "../../../ui/surfaces/box";
import {useUpdateDevice} from "../../../../redux/device/radEyeDevicesSlice";

const useStyles = makeStyles(() =>
    createStyles({
        gridContainer: {
            justifyContent: "center",
        }
    }),
);

const GeneralSettings = () => {

    const classes = useStyles();
    const generalSettings = useGeneralDeviceSettingsSelector();
    const {updateSelect, updateSwitch, updateSlider, updateTime} = useUpdateDevice();

    return (
        <Grid container className={classes.gridContainer} spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
                <AntSelect
                    name="language"
                    value={generalSettings.language}
                    onChange={updateSelect}
                    options={["german", "english", "français"]}
                    normalizeHeight
                    withPaper
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AntSelect
                    name="battery_type"
                    value={generalSettings.battery_type}
                    onChange={updateSelect}
                    options={["battery_rechargeable", "battery_alkaline"]}
                    normalizeHeight
                    withPaper
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AntSelect
                    name="accustic_view"
                    value={generalSettings.accustic_view}
                    onChange={updateSelect}
                    options={["none", "finder", "single_impulse"]}
                    normalizeHeight
                    withPaper
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AntSlider
                    name="history_log_time"
                    value={generalSettings.history_log_time}
                    onChange={(event, value) => updateSlider("history_log_time", value)}
                    max={3600}
                    min={0}
                    step={10}
                    caption="zero_history_save_manual"
                    withPaper
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AntBox>
                    <AntSelect
                        name="dose_rate_display_unit"
                        value={generalSettings.dose_rate_display_unit}
                        onChange={updateSelect}
                        options={["S-1", "SW/H", "R/H", "REM/H", "Level"]}
                    />
                    <br/><br/><br/>
                    <AntSelect
                        name="dose_rate_cps"
                        value={generalSettings.dose_rate_cps}
                        onChange={updateSelect}
                        options={["SW/H", "R/H", "REM/H"]}
                    />
                    <br/><br/><br/>
                    <AntSwitch
                        name="show_dr_in_cps_mode"
                        value={generalSettings.show_dr_in_cps_mode}
                        onChange={updateSwitch}
                    />
                </AntBox>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AntBox>
                    <DateTimePicker
                        name={"date_time"}
                        onChange={time => updateTime("pick_date", time)}
                        value={generalSettings.pick_date}
                    />
                    <br/><br/><br/>
                    <SyncTimeButton/>
                </AntBox>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AntBox>
                    <AntSwitch
                        name="beep_on_key"
                        value={generalSettings.beep_on_key}
                        onChange={updateSwitch}
                    />
                    <br/><br/><br/>
                    <AntSwitch
                        name="keyboard_lock"
                        value={generalSettings.keyboard_lock}
                        onChange={updateSwitch}
                    />
                </AntBox>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AntBox>
                    <AntSelect
                        name="temperature_display"
                        value={generalSettings.temperature_display}
                        onChange={updateSelect}
                        options={["none", "celsius", "fahrenheit"]}
                    />
                    <br/><br/><br/>
                    <AntSwitch
                        name="reversible"
                        value={generalSettings.reversible}
                        onChange={updateSwitch}
                    />
                    <br/><br/><br/>
                    <AntSwitch
                        name="graphical_view"
                        value={generalSettings.graphical_view}
                        onChange={updateSwitch}
                    />
                </AntBox>
            </Grid>
        </Grid>
    );
};

export default GeneralSettings;
