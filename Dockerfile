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
COPY --from=builder /my-project/public ./public
COPY --from=builder /my-project/.next ./.next
COPY --from=builder /my-project/node_modules ./node_modules
COPY --from=builder /my-project/package.json ./package.json