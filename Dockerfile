# #######
# Stage 1: Build an Angular Docker Image
# #######

# Take the node as base image and alias is as `build`
FROM node as build

# Docker needs the work Directory. Add the work directory `/app`
WORKDIR /app

# Copy the NPM package file from host to app directory in container
COPY package*.json /app/

# Install the package by runing command `npm install` by RUN
RUN npm install

# Copy the whole app directory to container's `/app` folder
COPY . /app

# Add the argument to command line or environment variable for configuration of angular production build
ARG configuration=production

# RUN the command which will build the angular production bundle and put it to `./dist/out` folder and $configuration will takes as argument for production build
RUN npm run build -- --outputPath=./dist/out --configuration $configuration

# #######
# Stage 2, use the compiled app, ready for production with Nginx
# #######

# Take the nginx as base image for docker build process
FROM nginx

# Copy the file from 'build' image /app/dist/out/ directory to /usr/share/nginx/html, which is the webserver root directory for nginx we define in `nginx.conf` file
COPY --from=build /app/dist/out/ /usr/share/nginx/html

# remove the nginx default configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the host /nginx/config.conf file to nginx container config directory
COPY nginx/nginx.conf /etc/nginx/conf.d

# we need to expose the port for docker image, so service can be access at outside of container
EXPOSE 80

# Run the `nginx` webserver by CMD docker instraction
CMD ["nginx", "-g", "daemon off;"]
