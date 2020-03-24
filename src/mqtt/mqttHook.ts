import {useDispatch} from "react-redux";
import {Message} from "paho-mqtt";
import {config} from "./config";
import store from "../redux/store";
import {onDevicesReceived} from "../redux/device/radEyeDevicesSlice";
import {onDictionaryReceived, onSettingsReceived} from "../redux/settings/settingsSlice";
import {onGatewaysReceived} from "../redux/gateway/gatewaySlice";
import {connectMqttClient, mqttClient} from "./mqttClient";
import {useEffect} from "react";

export const useConfigureAndConnectMqttClient = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        mqttClient.onMessageArrived = (message: Message): void => {
            if (/^[\],:{}\s]*$/.test(message.payloadString.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                const data = JSON.parse(message.payloadString);

                if (message.destinationName === config.topic_coming_going_toclient) {
                    if (data.devices) {
                        dispatch(onDevicesReceived(data.devices))
                    } else if (data.settings) {
                        dispatch(onSettingsReceived(data.settings))
                    } else if (data.gateways) {
                        store.dispatch(onGatewaysReceived(data.gateways))
                    } else if (data.dictionary) {
                        dispatch(onDictionaryReceived(data.dictionary))
                    }
                }
            }
        };

        connectMqttClient();
    }, []);
};
