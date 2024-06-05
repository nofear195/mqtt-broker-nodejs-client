# MQTT: Building a Broker and Node.js Client from Scratch

## Setup MQTT Service

### Create Account Using Scripts

1. create_user.sh
   - Create a new user and append it to the `config/passwd` file

   ```sh
   cd mqtt-broker
   chmod +x create_user.sh
   ./create_user.sh
   ```

2. create_user_batch.sh
   - Create multiple users at once

   ```sh
   cd mqtt-broker

   # add user:password pairs inside the config/passwd file
   nano ./config/passwd

   chmod +x create_user_batch.sh

   # encrypt all passwords inside the config/passwd file.
   ./create_user_batch.sh
   ```

### Setup MQTT Broker with Docker Compose

```bash
cd mqtt-broker
docker-compose up -d
```

## Node.js Client Examples

1. `clients/publisher.js`
   - Example of how to publish a message to the broker

2. `clients/subscriber.js`
   - Example of how to receive messages from the broker

3. `clients/mqttClient.js` + `clients/index.js`
   - Example for using a customize class `mqttClient` to handle the basic usage as a subscriber of the broker

## More Information
   - [https://nofear195.github.io/posts/mqtt-deployment](https://nofear195.github.io/posts/mqtt-deployment)
