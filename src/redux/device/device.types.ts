export type Maybe<T> = T | undefined;

export type Device = {
    device_id: string;
    device_name: string;
    connection_type: string;
    last_seen: string;
    host_name: string;

    // Todo Manu -> naming klären
    reversible: Maybe<string>;
    battery_type: Maybe<string>;
    accustic_view: Maybe<string>;
    history_log_time: Maybe<string>;

    dose_rate_display_unit: Maybe<string>;
    dose_rate_cps: Maybe<string>;
    temperature_display: Maybe<string>;
    beep_on_key: Maybe<string>,
    keyboard_lock: Maybe<string>,
    show_dr_in_cps_mode: Maybe<string>,
    graphical_view: Maybe<string>,
    pick_date: Maybe<string>;
    pick_time: Maybe<string>;
} & InfoData &
    MeasurementValues &
    ConfigurationValues &
    AlarmAndErrorFlags &
    RadEyeStatus;

type InfoData = {
    structure_version: Maybe<string>,
    type_info: Maybe<string>,
    serial_number: Maybe<string>,
    board_number: Maybe<string>,
    board_revision: Maybe<string>,
    calibration_date: Maybe<string>,
    next_calibration: Maybe<string>,
    hdrd_firmware_revision: Maybe<string>,
    hdrd_serial_number: Maybe<string>,
    hdrd_checksum: Maybe<string>,
    checksum: Maybe<string>
}

type MeasurementValues = {
    "structure_version": Maybe<string>,
    "type_info": Maybe<string>,
    "serial_number": Maybe<string>,
    "temperature": Maybe<string>,
    "free": Maybe<string>,
    "voltage": Maybe<string>,
    "count_rate_gamma": Maybe<string>,
    "count_rate_neutron": Maybe<string>,
    "dose_rate": Maybe<string>,
    "dose": Maybe<string>,
    "sigma_alarm_threshold": Maybe<string>,
    "alarm_and_error_flags": Maybe<string>,
    "radeye_status": Maybe<string>,
    "checksum": Maybe<string>,
}

type ConfigurationValues = {
    structure_version: Maybe<string>,
    sigma_threshold_gamma: Maybe<string>,
    sub_menu_set_alarm: Maybe<string>,
    sub_menu_alarm_indication: Maybe<string>,
    min_count_rate_for_sigma_alarm: Maybe<string>,
    language: Maybe<string>,
    scaler_pre_wait_time: Maybe<string>,
    remote_address_fot_btcom_cover: Maybe<string>,
    bt_pin: Maybe<string>,
    bt_flags_cover: Maybe<string>,
    bt_flags_radeye: Maybe<string>,
    minimal_count_rate_nbr: Maybe<string>,
    nbr_alarm_threshold: Maybe<string>,
    single_pulse_divider: Maybe<string>,
    display_contrast: Maybe<string>,
    tau_ratemeter_neutron: Maybe<string>,
    lutetium_check_interval: Maybe<string>,
    timeoute_neutron_fail: Maybe<string>,
    lutetium_check_password: Maybe<string>,
    measuring_time_scaler_background: Maybe<string>,
    preset_count_gamma_scaler_background: Maybe<string>,
    checksum: Maybe<string>,
};

type AlarmAndErrorFlags = {
    hv_error: Maybe<string>,
    detector_error: Maybe<string>,
    low_battery_voltage: Maybe<string>,
    empty_1: Maybe<string>,
    watchdog_error: Maybe<string>,
    eeprom_checksum_rror: Maybe<string>,
    empty_2: Maybe<string>,
    empty_3: Maybe<string>,
    empty_4: Maybe<string>,
    empty_5: Maybe<string>,
    empty_6: Maybe<string>,
    empty_7: Maybe<string>,
    empty_8: Maybe<string>,
    empty_9: Maybe<string>,
    empty_10: Maybe<string>,
    empty_11: Maybe<string>,
    empty_12: Maybe<string>,
    alarm_gamma_1: Maybe<string>,
    alarm_gamma_2: Maybe<string>,
    alarm_neutron_1: Maybe<string>,
    alarm_neutron_2: Maybe<string>,
    alarm_dose_1: Maybe<string>,
    alarm_dose_2: Maybe<string>,
    alarm_safety: Maybe<string>,
    low_mid_high_energy: Maybe<string>,
    empty_13: Maybe<string>,
    overload_gamma: Maybe<string>,
    overload_neutron: Maybe<string>,
    empty_14: Maybe<string>,
    empty_15: Maybe<string>
}

type RadEyeStatus = {
    ratemeter_netto: Maybe<string>,
    scaler_netto: Maybe<string>,
    accumulated_counts: Maybe<string>,
    background_measurement_active: Maybe<string>,
    scaler_preset_time: Maybe<string>,
    operation_mode_scaler: Maybe<string>,
    "operation:_mode_nuclide_id": Maybe<string>,
    cross_mode: Maybe<string>,
    measuring_unit_on_display: Maybe<string>,
    "measuring_unit_dose_:rate": Maybe<string>,
    empty_1: Maybe<string>,
    empty_2: Maybe<string>,
    empty_3: Maybe<string>,
    empty_4: Maybe<string>,
    empty_5: Maybe<string>,
    empty_6: Maybe<string>,
    empty_7: Maybe<string>,
}
