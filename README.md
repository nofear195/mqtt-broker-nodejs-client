# MQTT Fullstack Demo

This repository showcases a full-stack javascript application using MQTT (Message Queuing Telemetry Transport) for real-time communication. 
It consists of an MQTT broker via Docker Compose, a backend service using MQTT.js as both publisher and subscriber, and a React-based frontend server for WebSocket-based MQTT message reception.

## Components

### 1. MQTT Broker (Docker Compose)

To get started, set up the MQTT broker using Docker Compose. This will provide the messaging infrastructure for the MQTT communication:

```bash
cd mqtt-broker
docker-compose up -d
```

This Docker Compose file sets up the MQTT broker and initializes the password file for MQTT authentication, providing a ready-to-use MQTT broker environment with the required configuration.

#### `setup-password` Service

- **Purpose**: This service is responsible for setting up a password file for the MQTT broker's authentication.
- **Image**: It uses the `eclipse-mosquitto` image.
- **Volumes**: It mounts the `passwd` file to configure authentication.
- **Command**: It changes ownership of the password file, updates it with new passwords, and removes the setup script.
- **Network**: It is part of the `mqtt-network`.

#### `mqtt-broker` Service

- **Purpose**: This service runs the MQTT broker itself.
- **Image**: It also uses the `eclipse-mosquitto` image.
- **Ports**: It exposes ports 1883 for MQTT and 9001 for the MQTT WebSocket interface.
- **Volumes**: It mounts configuration files, password files, data storage, and log directories.
- **Dependencies**: It depends on the `setup-password` service to ensure authentication setup.
- **Network**: It is part of the `mqtt-network`.

#### `mqtt-network`

- **Purpose**: This network is created to allow communication between the `setup-password` and `mqtt-broker` services.

This Docker Compose setup creates a self-contained MQTT broker with configured authentication and necessary settings.


### 2. Backend Service (MQTT.js)

The backend service is responsible for both publishing and subscribing to MQTT topics. It leverages the MQTT.js library to establish a connection with the MQTT broker.

You can find the backend code in the `backend/` directory.

### 3. Frontend Server (React)

The frontend server is built using React and is designed to receive MQTT messages via WebSockets. It acts as a subscriber to the MQTT topics.

You can find the frontend code in the `frontend/` directory.

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/nofear195/mqtt-fullstack-demo.git
   ```

2. Set up the MQTT broker using Docker Compose as mentioned above.

3. Start the backend service by navigating to the `backend/` directory and running:

   ```bash
   cd backend
   npm install
   
   node run pub # for running publisher

   node run sub # for running subscriber
   ```

4. Start the React-based frontend server by navigating to the `frontend/` directory and running:

   ```bash
   cd frontend
   npm install
   npm start
   ```

Now, you have the full-stack MQTT demo up and running.
