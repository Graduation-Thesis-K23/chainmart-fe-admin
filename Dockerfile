FROM node:16-alpine as deps
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM node:16-alpine as build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build


FROM nginx:1.13.12-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 reactjs

USER reactjs

EXPOSE 3000

ENV PORT 3000

CMD ["nginx", "-g", "daemon off;"]