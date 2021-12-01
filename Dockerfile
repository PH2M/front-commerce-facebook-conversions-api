FROM node:12.22.1

RUN apt-get update && \
  apt-get install -y rsync git openssh-client python
RUN npm install -g autocannon
WORKDIR /project
