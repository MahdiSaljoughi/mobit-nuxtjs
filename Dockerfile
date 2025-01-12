FROM node:20.15-alpine as base

WORKDIR /app/

ENV PATH /opt/node_modules/.bin:$PATH
RUN npm i -g pnpm
COPY ./package.json ./pnpm-lock.yaml ./

# RUN yarn install && yarn cache clean
RUN pnpm i

COPY . .

RUN pnpm postinstall
RUN pnpm build

EXPOSE 3000

CMD ["pnpm","start"]