import {config} from "./config";
import mqtt, {Message, MQTTError} from "paho-mqtt"

export let mqttClient = new mqtt.Client(config.broker, 9001, Math.random().toString(36).substr(2, 9));

mqttClient.onConnectionLost = (error: MQTTError) => {
    console.log("connection lost, using broker:", config.broker)
    if (error.errorCode !== 0) {
        console.log("onConnectionLost:" + error.errorMessage);
    }
    mqttClient = new mqtt.Client(config.broker, 443, "client_id");
};

mqttClient.onMessageArrived = (message: Message) => {
    if (/^[\],:{}\s]*$/.test(message.payloadString.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

        console.log("wuuhuuu", message.payloadString);
    }
};

const onConnect = () => {
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

    setTimeout(function () {
        message = new Message("SHOW_DICTIONARY");
        message.destinationName = config.topic_coming_going_toserver;
        mqttClient.send(message);
    }, 30);
};

const connectionOptions = {
    onSuccess: onConnect,
    onFailure: (e: MQTTError) => console.log("onFailure", e)
};

export const connectMqttClient = () => mqttClient.connect(connectionOptions);


