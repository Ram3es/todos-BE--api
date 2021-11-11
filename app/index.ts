import { WEB_SERVER_SETTINGS } from "./constants/global"
import * as Koa from "koa";
import * as Router from "koa-router"
import "./knex"; 
import  todosRouter  from "./routes/Todos.router";
import  usersRouter from "./routes/Users.router";
import  authRouter  from "./routes/Auth.router"
import { commonMiddlewares } from "./middlewares"

const app = new Koa(); 
const router = new Router({prefix: "/api"})

const composeRouter = [todosRouter, usersRouter, authRouter]

app.use(commonMiddlewares())

composeRouter.forEach( item =>{
    router.use(item.middleware())
})

app.use(router.routes())



app.listen(WEB_SERVER_SETTINGS.PORT, ()=>{
    console.log(`Server is running!!! PORT: ${WEB_SERVER_SETTINGS.PORT}` );
});
