FROM node:20-alpine

WORKDIR /app

# Copy package manifests first
COPY package*.json ./

# Install dependencies
#RUN npm install
# Clean install production-only dependencies without audit/fund checks
RUN npm ci --only=production --no-audit --no-fund
# Copy the rest of the application code
COPY . .

CMD ["npm", "start"]