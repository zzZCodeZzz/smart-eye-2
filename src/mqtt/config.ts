import {useDispatch} from "react-redux";
import {Message} from "paho-mqtt";
import {onDevicesReceived} from "../redux/device/radEyeDevicesSlice";
import {onDictionaryReceived, onSettingsReceived} from "../redux/app/appSlice";
import {onGatewaysReceived} from "../redux/gateway/gatewaySlice";
import {connectMqttClient, mqttClient} from "./mqttClient";
import {useEffect} from "react";

export const mqttConfig = {
    // ----------------MQTT -------------------
    // See diagram at documentation "Parser Direction and Topics.pptx" in Docs Folder
    //IP or Hostname of MQTT TCP capable Broker
    "broker": "40.69.84.165",
    // Options: single or block. single reads and writes single commands from fields_config, block uses VI,sE0,sE1,sE2 for transfers
    "cmd_set": "block",
    "verbose_level": "3",
    // Topic for writing parser configs
    "topic_debug": "DEBUG",
    "topic_debug_qos": "2",
    "log_to_mqtt": "1",
    // Topic for writing parser configs
    "topic_config_write": "CONFIG/WRITE",
    "topic_config_write_qos": "2",
    //Topic for reading the parser config
    "topic_config_read": "CONFIG/READ",
    "topic_config_read_qos": "2",
    // Topic for raw data to be sent to devices
    "topic_raw_todevice": "RAW/TODEVICE",
    "topic_raw_todevice_qos": "2",
    // Topic for raw data sent from devices to a broker
    "topic_raw_tobroker": "RAW/TOBROKER/#",
    "topic_raw_tobroker_qos": "2",
    // Topic for parsed data for the client
    "topic_parsed_toclient": "PARSED/TOCLIENT",
    "topic_parsed_toclient_qos": "2",
    // Topic for data to broker to be parsed
    "topic_parsed_tobroker": "PARSED/TOBROKER/#",
    "topic_parsed_tobroker_qos": "2",
    // Topic for device registration and leaving information
    "topic_coming_going_toserver": "COMEANDGO",
    "topic_coming_going_toserver_qos": "2",
    // Topic for device registration and leaving information
    "topic_coming_going_toclient": "COMEANDGO/CLIENT",
    "topic_coming_going_toclient_qos": "2",
    // ----------------Logging -----------------------
    // Log all raw messages
    "log_raw": true,
    // Log all parsed messages
    "log_parsed": true,
    // Log changes to configuration file
    "log_config_change": true,
    // Debug logging
    "log_debug": true,
    // -------------Database -------------------------------
    // Options: Sqlite (nothing else implemented yet)
    "database_type": "Sqlite",
    // empty for Sqlite
    "database_port": 0,
    // empty for Sqlite
    "database_ip": "0.0.0.0"
};

export const useConfigureAndConnectMqttClient = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        mqttClient.onMessageArrived = (message: Message): void => {
            // eslint-disable-next-line no-useless-escape
            if (/^[\],:{}\s]*$/.test(message.payloadString
                .replace(/\\["\\\/bfnrtu]/g, '@')
                .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))
            ) {
                const data = JSON.parse(message.payloadString);

                if (message.destinationName === mqttConfig.topic_coming_going_toclient) {
                    if (data.devices) {
                        dispatch(onDevicesReceived(data.devices));
                    } else if (data.settings) {
                        dispatch(onSettingsReceived(data.settings));
                    } else if (data.gateways) {
                        dispatch(onGatewaysReceived(data.gateways));
                    } else if (data.dictionary) {
                        dispatch(onDictionaryReceived(data.dictionary));
                    }
                }
            }
        };
        connectMqttClient();
    }, [dispatch]);
};

