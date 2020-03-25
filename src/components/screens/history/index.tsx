import React from 'react';
import MaterialTable, {Column} from 'material-table';
import {useActiveDeviceHistory} from "../../../redux/device/deviceStoreSelectors";

export default function DeviceHistory() {

    const activeDeviceHistory = useActiveDeviceHistory();

    return (
        <div>
            <MaterialTable
                title={""}
                columns={[
                    {title: "line", field: "line"},
                    {title: "device_id", field: "device_id"},
                    {title: "time_record_todb", field: "time_record_todb"},
                    {title: "time_measurestring", field: "time_measurestring"},
                    {title: "mean_value_activity", field: "mean_value_activity"},
                    {title: "mean_value_count_rate", field: "mean_value_count_rate"},
                    {title: "max_value_activity", field: "max_value_activity"},
                    {title: "max_value_count_rate", field: "max_value_count_rate"},
                    {title: "mean_value_dose_rate", field: "mean_value_dose_rate"},
                    {title: "max_value_dose_rate", field: "max_value_dose_rate"},
                    {title: "measuring_time", field: "measuring_time"},
                    {title: "temperature", field: "temperature"},
                    {title: "ratemeter_net_value", field: "ratemeter_net_value"},
                    {title: "operation_mode_scaler", field: "operation_mode_scaler"},
                    {title: "background_measurement", field: "background_measurement"},
                    {title: "preset_time", field: "preset_time"},
                    {title: "dose_rate_unit", field: "dose_rate_unit"},
                    {title: "contamination_bq", field: "contamination_bq"},
                ]}
                // fix, since objects from mqtt are not editable
                data={JSON.parse(JSON.stringify(activeDeviceHistory))}
            />
        </div>
    );
}
