#!/bin/sh

# Run migration
echo "Starting Migrations"
npm run migration:run

# Start the NestJS application
echo "Starting NestJS application..."
npm run start:prod