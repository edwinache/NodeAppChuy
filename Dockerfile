FROM node:20-alpine

WORKDIR /app

# Copy package manifests first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

CMD ["npm", "start"]