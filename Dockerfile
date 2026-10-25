FROM node:20-alpine

WORKDIR /app

# Copia los manifiestos de dependencias
COPY package*.json ./

# Instala solo dependencias de producción
RUN npm ci --omit=dev --no-audit --no-fund

# Copia el código fuente
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]