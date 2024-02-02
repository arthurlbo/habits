# pull the Node.js Docker image
FROM node:alpine

# create the directory inside the container
WORKDIR /usr/app

# copy the package.json files from local machine to the workdir in container
COPY package.json pnpm-lock.yaml ./

# run pnpm install in our local machine
RUN pnpm i

# copy the generated modules and all other files to the container
COPY . .

# our app is running on port 3333 within the container, so need to expose it
EXPOSE 3333

# the command that starts our app
CMD ["pnpm", "start"]
