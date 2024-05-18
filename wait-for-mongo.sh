#!/bin/bash

MONGO_HOST="mongo"
MONGO_PORT="27017"

# Wait for MongoDB to be ready
until nc -z $MONGO_HOST $MONGO_PORT; do
  echo "Waiting for MongoDB..."
  sleep 1
done

echo "MongoDB is up and running!"
exec "$@"