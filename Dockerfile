FROM node:16.10.0 as build
RUN mkdir /customer
WORKDIR /customer
ENV PATH /customer/node_modules/.bin:$PATH
COPY package.json /customer/package.json
RUN yarn
RUN yarn add react-scripts -g
COPY . /customer
RUN yarn build

FROM nginx:1.13.12-alpine
COPY --from=build /customer/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]