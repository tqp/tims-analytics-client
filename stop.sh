#!/usr/bin/env bash

echo "Stop Docker Compose..."
docker-compose down
echo "Done."
read -p "Press any key to continue..."

echo "Stop Docker Compose..."
docker image rm mystique-tester-client
echo "Done."
read -p "Press any key to continue..."