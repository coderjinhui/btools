import Router = require('koa-router');
import DBManager from '../../db';
import { User } from '../../db/entity/User';

const userRouter = new Router();

userRouter.get('/', async (ctx) => {
    const connection = await DBManager.Instance.getConnection();
    const results = await connection.getRepository(User).find();
    ctx.body = results;
})

userRouter.get('/create', async (ctx) => {
    const connection = await DBManager.Instance.getConnection();

    const firstName = ctx.request.query.firstName.toString();
    const lastName = ctx.request.query.lastName.toString();
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.age = 10;

    const result = await connection.getRepository(User).save(user);
    ctx.body = result;
})

export default userRouter;