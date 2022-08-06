FROM node:lts as dependencies
WORKDIR /oli
COPY package.json yarn.lock ./
RUN apt-get update && apt-get install -y python3-pip && \
    pip3 install yarn && \
    yarn install --frozen-lockfile

FROM node:lts as mmdvmhost
WORKDIR /oli/mmdvm/
COPY MMDVMHost/ .
RUN apt-get update && apt-get install -y build-essential
RUN cd /oli/mmdvm && \
    make && \
    make INSTALL_DIR=/oli install

FROM node:lts as builder
WORKDIR /oli
COPY . .
COPY --from=dependencies /oli/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /oli
ENV NODE_ENV production
COPY --from=mmdvmhost /oli/MMDVMHost /oli/MMDVMHost
COPY --from=mmdvmhost /oli/RemoteCommand /oli/RemoteCommand
COPY --from=builder /oli/public ./public
COPY --from=builder /oli/.next ./.next
COPY --from=builder /oli/node_modules ./node_modules
COPY --from=builder /oli/package.json ./package.json
COPY conf/MMDVM.ini.handlebars .
RUN mkdir /oli/log
RUN mkdir /oli/conf

EXPOSE 3000
CMD ["yarn", "start"]
