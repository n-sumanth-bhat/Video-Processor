# Step 1: Build the React app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Set NODE_OPTIONS to handle the OpenSSL issue
ENV NODE_OPTIONS=--openssl-legacy-provider

# Build the React app
RUN npm run build

# Serve the application with a static file server
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]