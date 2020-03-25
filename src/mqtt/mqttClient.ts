import {mqttConfig} from "./config";
import mqtt, {Message, MQTTError} from "paho-mqtt"
import {Device} from "../redux/device/device.types";

export let mqttClient = new mqtt.Client(mqttConfig.broker, 9001, Math.random().toString(36).substr(2, 9));

export const MQTTsendDevice = (device: Device) => {
    const message = new Message(JSON.stringify(device));
    message.destinationName = mqttConfig.topic_parsed_tobroker.replace('#', device.device_id);
    mqttClient.send(message);
};

export const MQTTSubscribeHistoryForActiveDevice = (deviceId: string) => {
    const message = new Message(('{ "cmd":"query","table":"history_values","order_by":"measuring_time","direction":"desc"}'));
    message.destinationName = mqttConfig.topic_parsed_tobroker.replace('#', deviceId);
    mqttClient.send(message);
};

mqttClient.onConnectionLost = (error: MQTTError): void => {
    console.log("connection lost, using broker:", mqttConfig.broker)
    if (error.errorCode !== 0) {
        console.log("onConnectionLost:" + error.errorMessage);
    }
    const newMqttClient = new mqtt.Client(mqttConfig.broker, mqttClient.port, mqttClient.clientId);
    newMqttClient.connect(connectionOptions);
    mqttClient = newMqttClient;
};

const onConnect = (): void => {
    mqttClient.subscribe(mqttConfig.topic_coming_going_toclient);
    mqttClient.subscribe(mqttConfig.topic_coming_going_toserver);
    mqttClient.subscribe(mqttConfig.topic_parsed_toclient + "/#");

    let message = new Message("{\"client\":\"" + window.location.hostname + "\"}");
    message.destinationName = mqttConfig.topic_coming_going_toserver;
    mqttClient.send(message);

    message = new Message("GET_DEVICES");
    message.destinationName = mqttConfig.topic_coming_going_toserver;
    mqttClient.send(message);

    message = new Message("SHOW_GATEWAYS");
    message.destinationName = mqttConfig.topic_coming_going_toserver;
    mqttClient.send(message);

    message = new Message("SHOW_DEVICES");
    message.destinationName = mqttConfig.topic_coming_going_toserver;
    mqttClient.send(message);

    message = new Message("SHOW_DICTIONARY");
    message.destinationName = mqttConfig.topic_coming_going_toserver;
    mqttClient.send(message);

    message = new Message("SHOW_DICTIONARY");
    message.destinationName = mqttConfig.topic_coming_going_toserver;
    mqttClient.send(message);
};

const connectionOptions: mqtt.ConnectionOptions = {
    onSuccess: onConnect,
    onFailure: (e: MQTTError) => console.log("onFailure", e)
};

export const connectMqttClient = () => mqttClient.connect(connectionOptions);

