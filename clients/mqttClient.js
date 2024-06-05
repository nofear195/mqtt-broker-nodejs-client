const mqtt = require("mqtt");

function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

class MqttClient {
  constructor(name, url, username, password, topics) {
    this.name = name;
    this.url = url;
    this.username = username;
    this.password = password;
    this.topics = topics;
    this.client = null;
  }
  connect() {
    return new Promise((resolve, reject) => {
      this.client = mqtt.connect(this.url, { username: this.username, password: this.password, qos: 1, retain: true });

      this.client.on("connect", () => {
        console.info(`Connected to MQTT broker : ${this.name}`);
        // Subscribe to all topics
        this.topics.forEach((topic) => this.client.subscribe(topic));

        resolve(this.client); // Resolve the promise with the MQTT client instance
      });

      this.client.on("error", (error) => {
        console.error(`Error connecting to MQTT broker : ${this.name}`);
        reject(error); // Reject the promise with the error
        this.handleError();
      });

      this.client.on("close", () => {
        console.info(`Disconnected from MQTT broker : ${this.name}`);
        this.handleClose();
      });

      this.client.on("message", async (topic, message) => {
        const messageToString = message.toString();

        const messageContent = isValidJSON(messageToString) ? JSON.parse(messageToString) : messageToString;
        this.handleMessage(topic, messageContent);
      });
    });
  }
  async disconnect() {
    await this.client.endAsync(true);
  }
  handleMessage(topic, message) {
    console.log(topic, message);
  }
  handleError() {}
  handleClose() {}
}

module.exports = MqttClient;
