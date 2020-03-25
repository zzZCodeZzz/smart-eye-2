import {Button} from "@material-ui/core";
import React from "react";
import {useDispatch} from "react-redux";
import {updateDeviceLocalAndRemote} from "../../../../redux/device/radEyeDevicesSlice";
import moment from "moment";
import {useTranslation} from "react-i18next";

const SyncTimeButton = () => {

    const dispatch = useDispatch();
    const {t} = useTranslation();

    const onClick = () => dispatch(
            updateDeviceLocalAndRemote("sync_host", moment().format("YYYY-MM-DD HH:mm:ss"))
    );
    return (<Button onClick={onClick}>{t("sync_host")}</Button>);
};

export default SyncTimeButton;
