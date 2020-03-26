import React from 'react';
import MaterialTable from 'material-table';
import {useActiveDeviceHistory} from "../../../redux/device/deviceStoreSelectors";
import {Container, createStyles} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(() =>
    createStyles({
        main: {
            flexGrow: 1,
            overflowX: "hidden",
            padding: 20,
            maxWidth: "100%",

        }
    })
);

export default function DeviceHistory() {

    const activeDeviceHistory = useActiveDeviceHistory();
    const classes = useStyles();
    const {t} = useTranslation();

    return (
        <Container className={classes.main} component="main">
            <MaterialTable
                title={""}
                columns={[
                    {title: t(""), field: "line"},
                    {title: t("device_id"), field: "device_id"},
                    {title: t("time_record_todb"), field: "time_record_todb"},
                    {title: t("time_measure"), field: "time_measure"},
                    {title: t("mean_value_activity"), field: "mean_value_activity"},
                    {title: t("mean_value_count_rate"), field: "mean_value_count_rate"},
                    {title: t("max_value_activity"), field: "max_value_activity"},
                    {title: t("max_value_count_rate"), field: "max_value_count_rate"},
                    {title: t("mean_value_dose_rate"), field: "mean_value_dose_rate"},
                    {title: t("max_value_dose_rate"), field: "max_value_dose_rate"},
                    {title: t("measuring_time"), field: "measuring_time"},
                    {title: t("temperature"), field: "temperature"},
                    {title: t("ratemeter_net_value"), field: "ratemeter_net_value"},
                    {title: t("operation_mode_scaler"), field: "operation_mode_scaler"},
                    {title: t("background_measurement"), field: "background_measurement"},
                    {title: t("preset_time"), field: "preset_time"},
                    {title: t("dose_rate_unit"), field: "dose_rate_unit"},
                    {title: t("contamination_bq"), field: "contamination_bq"},
                ]}
                options={{
                    headerStyle: {
                        fontSize: "0.8rem",
                        writingMode: "sideways-lr",
                        textOrientation: "mixed",
                        textTransform: "uppercase"
                    },
                    pageSize: 5,
                    pageSizeOptions: [10, 20, 30, 50],
                }}

                // fix, since objects from mqtt are not editable
                data={JSON.parse(JSON.stringify(activeDeviceHistory))}
            />
        </Container>
    );
}
