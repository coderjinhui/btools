import Router = require('koa-router');
import userRouter from './user/User.router';
let router = new Router()
router.use('/user', userRouter.routes(), userRouter.allowedMethods())



export default router;