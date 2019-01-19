# onginxn part d'ubuntu xenial
FROM ubuntu:16.04

# on load sh
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# installation des deps de base
RUN apt-get update && \
    apt-get install -y curl git tar \
    bzip2 bcrypt gcc python make build-essential \
    libfontconfig zip wget

# install de node 6 sans nvm
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get update && \
    apt-get install -y nodejs
RUN curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | bash
RUN apt-get install -y git-lfs
RUN npm install -g pm2

RUN touch /var/log/null.log
CMD cd /var/www/galnet-archives && tail -f /var/log/null.log

