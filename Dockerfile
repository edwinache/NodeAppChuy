FROM node:18-slim

WORKDIR /app

# Copy application files into the image
COPY . .

EXPOSE 3000

# Install dependencies and start the app when the container starts
CMD ["sh", "-c", "npm install --omit=dev && npm start"]