# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application's port
EXPOSE 8080

# Set environment variables
ENV DB_NAME=warrantymanagementdb \
    DB_USER=monish \
    DB_PASS=MyVeryStrongP@ss! \
    DB_HOST=13.126.188.121 \
    PORT=8080 

# Start the application
CMD ["npm", "start"]
