# Dockerfile

FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install 

# COPY the rest of the application code
COPY . .

# change permission
RUN chmod +x entrypoint.sh

# Build the NestJS application
RUN npm run build

# Expose the port that the NestJS app runs on
EXPOSE 3000

# Set the entrypoint to use the shell script
ENTRYPOINT ["/app/entrypoint.sh"]