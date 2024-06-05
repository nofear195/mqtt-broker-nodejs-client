const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://192.168.1.101:1883',{
    username:'user123',
    password:'123'
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
