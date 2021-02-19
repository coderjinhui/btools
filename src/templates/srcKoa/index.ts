import "reflect-metadata";

import Koa = require('koa');

import router from './route';
const app = new Koa();


app.use(router.routes()).use(router.allowedMethods())

app.listen(3002, () => {
    console.log('[start] app is starting at http://localhost:3002');
})
