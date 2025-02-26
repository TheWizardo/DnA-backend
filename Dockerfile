# Dockerfile
FROM node:18-alpine3.21

# Create directory for our app in the container
WORKDIR /usr/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --production

# Copy the rest of our application
COPY ./build .

# Creating a log folder
RUN mkdir logs

# Install PM2 globally
# RUN npm install -g pm2

# Expose port 4272 inside the container
EXPOSE 4272

# Command: Start the server with PM2
# CMD ["ls", "-l", "/data"]
CMD ["node", "app.js"]