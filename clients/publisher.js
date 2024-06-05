const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://mqtt-broker:1883',{
    username:'user',
    password:'user'
});

client.on('connect', () => {
  console.log('Publisher connected to MQTT broker');
  setInterval(() => {
    client.publish('test/topic', 'Hello, MQTT!'); // Publish a message to a topic
  }, 1000);
});

client.on('close', () => {
  console.log('Publisher disconnected from MQTT broker');
  client.end()
});
