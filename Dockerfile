# ---------------------------
# Stage 1: build React
# ---------------------------
FROM node:20 AS build
WORKDIR /app

# Copier package.json & installer les dépendances
COPY package*.json ./
RUN npm ci

# Copier le code et build
COPY . .
RUN npm run build

# ---------------------------
# Stage 2: serve avec Nginx
# ---------------------------
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Optional: si tu as un fichier nginx.conf personnalisé
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
