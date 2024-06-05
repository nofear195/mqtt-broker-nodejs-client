const MqttClient = require("./mqttClient");

const client = new MqttClient("new client", "mqtt://mqtt-broker:1883", "user", "user", ["test/topic"]);

client.connect();

// Handle SIGTERM signal
process.on("SIGTERM", async () => await client.disconnect());

// Handle SIGINT signal
process.on("SIGINT", async () => await client.disconnect());
