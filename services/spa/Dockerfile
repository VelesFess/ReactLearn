# Используй образ Node.js
FROM node:22-alpine as builder

WORKDIR /app

# Установи зависимости
COPY package*.json ./
RUN npm install

# Скопируй код
COPY . .
RUN npm run build

# Используй Nginx для отдачи статики
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html