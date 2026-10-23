FROM node:18-slim

WORKDIR /app

COPY . .

# Check what files actually arrived in the image
RUN ls -la

RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "start"]