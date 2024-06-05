#!/bin/bash

# Function to check if a command exists
command_exists() {
  command -v "$1" &> /dev/null
}

# Check if Docker is installed
if ! command_exists docker; then
  echo "Docker is not installed. Please install Docker and try again."
  exit 1
fi

# Prompt the user for the username and password
read -p "Enter the username: " username
read -sp "Enter the password: " password
echo

# Pull the Mosquitto image
docker pull eclipse-mosquitto:2.0.18

# Create the config directory if it doesn't exist
mkdir -p ./config

# Create an empty password file if it doesn't exist
touch ./config/passwd

# Run the container to set up the password
docker run --rm -v "$(pwd)/config/passwd:/mosquitto/config/passwd" eclipse-mosquitto:2.0.18 sh -c "
chmod 0700 /mosquitto/config/passwd &&
chown root:root /mosquitto/config/passwd &&
mosquitto_passwd -b /mosquitto/config/passwd $username $password
"

echo "Username and password have been added to the passwd file."
