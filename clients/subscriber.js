const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://mqtt-broker:1883',{
    username:'user',
    password:'user'
});

client.on('connect', () => {
  console.log('Subscriber connected to MQTT broker');
  client.subscribe('test/topic'); // Subscribe to a topic
});

client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
});

client.on('close', () => {
  console.log('Subscriber disconnected from MQTT broker');
  client.end()
});
