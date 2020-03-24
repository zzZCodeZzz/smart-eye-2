import {config} from "./config";
import mqtt, {Message, MQTTError} from "paho-mqtt"
import store, {AppThunk} from "../redux/store";
import {Device} from "../redux/device/device.types";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {onDevicesReceived} from "../redux/device/radEyeDevicesSlice";
import {onDictionaryReceived, onSettingsReceived} from "../redux/settings/settingsSlice";
import {onGatewaysReceived} from "../redux/gateway/gatewaySlice";

export let mqttClient = new mqtt.Client(config.broker, 9001, Math.random().toString(36).substr(2, 9));

export const MQTTsendDevice = (device: Device): AppThunk => async (dispatch, getState) => {
    const message = new Message(JSON.stringify(device));
    message.destinationName = config.topic_parsed_tobroker.replace('#', device.device_id);
    mqttClient.send(message);
};

mqttClient.onConnectionLost = (error: MQTTError): void => {
    console.log("connection lost, using broker:", config.broker)
    if (error.errorCode !== 0) {
        console.log("onConnectionLost:" + error.errorMessage);
    }
   mqttClient = new mqtt.Client(config.broker, 443, mqttClient.clientId);
};

const onConnect = (): void => {
    mqttClient.subscribe(config.topic_coming_going_toclient);
    mqttClient.subscribe(config.topic_coming_going_toserver);
    mqttClient.subscribe(config.topic_parsed_toclient + "/#");

    let message = new Message("{\"client\":\"" + window.location.hostname + "\"}");
    message.destinationName = config.topic_coming_going_toserver;
    mqttClient.send(message);

    message = new Message("GET_DEVICES");
    message.destinationName = config.topic_coming_going_toserver;
    mqttClient.send(message);

    message = new Message("SHOW_GATEWAYS");
    message.destinationName = config.topic_coming_going_toserver;
    mqttClient.send(message);

    message = new Message("SHOW_DEVICES");
    message.destinationName = config.topic_coming_going_toserver;
    mqttClient.send(message);

    message = new Message("SHOW_DICTIONARY");
    message.destinationName = config.topic_coming_going_toserver;
    mqttClient.send(message);

    message = new Message("SHOW_DICTIONARY");
    message.destinationName = config.topic_coming_going_toserver;
    mqttClient.send(message);
};

const connectionOptions: mqtt.ConnectionOptions = {
    onSuccess: onConnect,
    onFailure: (e: MQTTError) => console.log("onFailure", e)
};

export const connectMqttClient = () => mqttClient.connect(connectionOptions);

// export const useConfigureAndConnectMqttClient = () => {
//     const dispatch = useDispatch();
//
//     useEffect(() => {
//         mqttClient.onMessageArrived = (message: Message): void => {
//             if (/^[\],:{}\s]*$/.test(message.payloadString.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
//
//                 const data = JSON.parse(message.payloadString);
//
//                 if (message.destinationName === config.topic_coming_going_toclient) {
//                     if (data.devices) {
//                         dispatch(onDevicesReceived(data.devices))
//                     } else if (data.settings) {
//                         dispatch(onSettingsReceived(data.settings))
//                     } else if (data.gateways) {
//                         store.dispatch(onGatewaysReceived(data.gateways))
//                     } else if (data.dictionary) {
//                         dispatch(onDictionaryReceived(data.dictionary))
//                     }
//                 }
//             }
//         };
//
//         mqttClient.connect(connectionOptions);
//     }, []);
// };


