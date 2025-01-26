#Use a lightweight Node.js image
FROM node:18-alpine AS build


#Set Working Directory
WORKDIR /app

#Copy package.json and install dependencies
COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

#Build the application
RUN npm run build





# Stage 2: serve the application
FROM nginx:stable-alpine

#Copy the build output from the previous stage to Nginx's static files directory
COPY --from=build /app/dist /usr/share/nginx/html



EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]


# Run = > docker run -d -p 80:80 --name my-react-app-container my-react-app:latest  => Create a new container with the name "my-react-app-container"

# Stop => docker stop my-react-app-container (container)

#Simplicity: By leaving Nginx as (listening on port 80) and adjusting the host mapping, you simplify set up and maintenance.

# Run again without creating a new container: docker start my-react-app-container