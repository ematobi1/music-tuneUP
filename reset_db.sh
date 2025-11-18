#!/bin/bash
echo "Resetting MongoDB data volume..."
docker-compose down -v
echo "Done. Now run ./start_dev.sh again."
