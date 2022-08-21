FROM node:lts as dependencies
WORKDIR /oli
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as mmdvmhost
WORKDIR /oli/mmdvm/
COPY MMDVMHost/ .
RUN cd /oli/mmdvm && \
    make -j && \
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
RUN groupadd -g 995 docker && \
    usermod -aG docker node && \
    usermod -aG dialout node && \
    mkdir /oli/log && \
    mkdir /oli/conf && \
    chown -R node /oli/conf && \
    chown -R node /oli/log


USER node
EXPOSE 3000
CMD ["yarn", "start"]
