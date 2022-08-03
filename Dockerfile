FROM node:lts as dependencies
WORKDIR /oli
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /oli
COPY . .
COPY --from=dependencies /oli/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /oli
ENV NODE_ENV production
COPY --from=builder /oli/public ./public
COPY --from=builder /oli/.next ./.next
COPY --from=builder /oli/node_modules ./node_modules
COPY --from=builder /oli/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]