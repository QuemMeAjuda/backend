FROM node:8.11.1
COPY . /var/apps/quem_me_ajuda/backend/
WORKDIR /var/apps/quem_me_ajuda/backend/
RUN npm install


