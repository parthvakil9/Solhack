FROM node:20-alpine as build

WORKDIR /usr/src/app

COPY ./src /usr/src/app

# RUN apk add git

WORKDIR /usr/src/app
RUN yarn install --non-interactive --frozen-lockfile --ignore-engines  && yarn cache clean

WORKDIR /usr/src/app/frontend 
RUN npm install && npm cache clean --force

# Manually Copy solidity compiler
COPY ./list.json /usr/src/app/.cache/hardhat-nodejs/compilers/linux-amd64/list.json        
COPY ./solc-linux-amd64-v0.8.20+commit.a1b79de6 /usr/src/app/.cache/hardhat-nodejs/compilers/linux-amd64/solc-linux-amd64-v0.8.20+commit.a1b79de6                                                                                                                        
#RUN npx hardhat compile


FROM node:20-alpine

COPY --from=build /usr/src/app /usr/src/app

WORKDIR /usr/src/app

EXPOSE 8545
EXPOSE 3000

#COPY $PWD/docker/entrypoint.sh /usr/local/bin
#COPY $PWD/docker/frontend.sh /usr/local/bin
#COPY $PWD/docker/backbone.sh /usr/local/bin
ENTRYPOINT ["/bin/sh", "./backbone.sh"]