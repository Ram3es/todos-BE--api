import * as Router from "koa-joi-router";
import { fetchTodoByIdCntrl,
        createTodoCntrl,
        updateTodoByIdCntrl, 
        removeTodoByIdCntrl, 
        fetchAllTodosCntrl  
       } from "../controllers/Todos.controler";
import { todosResponse, errorValidators } from "../shared/validators"       

const todosRouter =  Router();
todosRouter.prefix("/todos")

todosRouter.route({
    method: "get",
    path:"/",
    //pre: interceptors, [interceptors,interceptors],
    validate: {
        output:{
            200:{
                body: todosResponse
            },
            400:{
                body: errorValidators
            },
            500:{
                body: errorValidators
            }
        }
    },
    handler: fetchAllTodosCntrl
})

todosRouter.route({
    method: "get",
    path:"/:id",
    //pre: interceptors, [interceptors,interceptors],
    handler: fetchTodoByIdCntrl
})
todosRouter.route({
    method: "post",
    path:"/",
    //pre: interceptors, [interceptors,interceptors],
    handler: createTodoCntrl
})
todosRouter.route({
    method: "put",
    path:"/:id",
    //pre: interceptors, [interceptors,interceptors],
    handler: updateTodoByIdCntrl
})
todosRouter.route({
    method: "delete",
    path:"/:id",
    //pre: interceptors, [interceptors,interceptors],
    handler: removeTodoByIdCntrl
})

export default todosRouter;