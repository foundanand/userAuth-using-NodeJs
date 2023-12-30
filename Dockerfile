# Dockerfile

# Use the official Node.js image as a base image
FROM node:lts-alpine

# Set the working directory to /app
WORKDIR /app

# Copy both package.json and package-lock.json to the container
COPY package*.json ./

# Clear npm cache
RUN npm cache clean --force

# Install production dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 5400

# Command to run your application
CMD ["npm", "start"]
