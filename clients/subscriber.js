const mqtt = require('mqtt');

const client = mqtt.connect('ws://192.168.1.101:9001',{
    username:'user123',
    password:'123'
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
