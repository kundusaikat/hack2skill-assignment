# Base image
FROM node:14-alpine

# Set the working directory
WORKDIR /

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json*  ./

# Install dependencies
RUN npm install --silent

# Copy the app's source code
COPY . .

# Build the app
RUN npm run build

# Expose the container port
EXPOSE 3000

# Define the command to run the app when the container starts
CMD ["npm", "start"]
