# Dockerfile
FROM node:18-alpine3.21

ENV PORT=4272
ENV NODE_ENV=production

# Create directory for our app in the container
WORKDIR /usr/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --production

# Copy the source code into the container
COPY ./build .

# Expose port 4272 inside the container
EXPOSE ${PORT}

# Command: Start the server
CMD ["node", "app.js"]