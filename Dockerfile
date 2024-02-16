from node:18
WORKDIR /app 
COPY package.json .
RUN yarn 
COPY ./prisma ./prisma
COPY ./src ./src
COPY ./test ./test
COPY .eslintrc.js .
COPY nest-cli.json .
COPY tsconfig.build.json .
COPY tsconfig.json .
RUN yarn prisma generate
EXPOSE 3335
CMD ["yarn", "start"]