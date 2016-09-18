import { connect } from 'mqtt';

function invert(obj) {
    const keys = Object.keys(obj);
    const newObj = {};

    keys.forEach(key => {
        newObj[obj[key]] = key;
    });

    return newObj;
}

class MQTTRedux {
    constructor(config) {
        this.config = config;
        this.mqtt = connect(config.url, config.opt);
        this.topicActionMap = {};
    }

    connect(actions, store) {
        const actionNames = Object.keys(actions);
        this.topicActionMap = invert(actions);
        this.mqtt.on('connect', () => {
            store.dispatch({
                type: 'MQTT_CONNECT',
                message: 'Connected to MQTT broker',
            });

            actionNames.forEach(action => {
                this.mqtt.subscribe(actions[action], { qos: 0 });
            });
        });

        this.mqtt.on('disconnect', () => {
            store.dispatch({
                type: 'MQTT_DISCONNECT',
                message: 'Disconnected from MQTT broker',
            });
        });

        this.mqtt.on('message', (topic, payload) => {
            if (this.topicActionMap[topic]) {
                store.dispatch({
                    type: this.topicActionMap[topic],
                    payload: payload.toString(),
                    topic: topic,
                });
            }
        });

        this.mqtt.on('error', err => {
            store.dispatch({
                type: 'MQTT_ERROR',
                error: err,
            });
        });
    }

    subscribe(actionMap) {
        const actionNames = Object.keys(actionMap);
        actionNames.forEach(action => {
            this.mqtt.subscribe(actionMap[action], { qos: 0});
            this.topicActionMap[actionMap[action]] = action;
        });
    }

    unsubscribe(actions) {
        const actionMap = invert(this.topicActionMap);

        if (Array.isArray(actions)) {
            let topic;

            actions.forEach(action => {
                topic = actionMap[action];
                this.mqtt.unsubscribe(topic);

                delete this.topicActionMap[topic];
            });
        } else {
            this.mqtt.unsubscribe(actionMap[actions]);

            delete this.topicActionMap[actionMap[actions]];
        }
    }

    createMiddleware() {
         const mqttClient = this.mqtt;

        return store => next => action => {
            if (action.mqtt) {
                const mqtt = action.mqtt;
                let payload;

                if (mqtt.topic && typeof mqtt.payload !== 'function') {
                    payload = typeof mqtt.payload === 'string'
                        ? mqtt.payload
                        : JSON.stringify(mqtt.payload);


                } else if (mqtt.topic && typeof mqtt.payload === 'function') {
                    payload = mqtt.payload.call(null, store.getState());
                }

                mqttClient.publish(mqtt.topic, payload, { qos: 0 });

                const modifiedAction = {
                    ...action,
                    mqtt: {
                        payload,
                        topic: mqtt.topic,
                    },
                };

                return next(modifiedAction);
            }

            return next(action);
        };
    }
}

export function createClient(config) {
    return new MQTTRedux(config);
}
