FROM node:18-slim

WORKDIR /app

COPY package*.json ./

# Added --verbose to print the exact crash cause
RUN npm install --omit=dev --verbose

COPY . .

EXPOSE 3000

CMD ["npm", "start"]