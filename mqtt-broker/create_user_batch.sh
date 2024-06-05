#!/bin/bash

# Ensure the script exits if any command fails
set -e

# Pull the Mosquitto image
docker pull eclipse-mosquitto:2.0.18

# Create the config directory if it doesn't exist
mkdir -p ./config

# Create an empty password file if it doesn't exist
touch ./config/passwd

# Define variables
IMAGE="eclipse-mosquitto:2.0.18"
VOLUME_PATH="$(pwd)/config/passwd"
COMMAND="chmod 0700 /mosquitto/config/passwd && \
         chown root:root /mosquitto/config/passwd && \
         mosquitto_passwd -U /mosquitto/config/passwd && \
         rm -f /docker-entrypoint-initdb.d/setup-password.sh"

# Run Docker command
docker run -d --rm --init \
  -v "$VOLUME_PATH":/mosquitto/config/passwd \
  "$IMAGE" \
  sh -c "$COMMAND"
