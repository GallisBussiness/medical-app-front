FROM alpine 
COPY . .

RUN npm i

RUN npm run build

RUN npm i -g pm2

CMD ['pm2','start','--spa', 'dist/index.html']