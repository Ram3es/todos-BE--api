import * as Router from "koa-joi-router";
import { fetchAllUsersCntrl,
     fetchAllUsersByIdCntrl,
      createUserCntrl,
       upateUserByIdCntrl,
        removeUserByIdCntrl } from "../controllers/Users.controller";
import { errorValidators } from "../shared/validators" 

const usersRouter = Router()
usersRouter.prefix("/users")

usersRouter.route({
    method: "GET",
    path: "/",
    handler: fetchAllUsersCntrl,
    validate: {}
})

usersRouter.route({
    method: "GET",
    path: "/:id",
    handler: fetchAllUsersByIdCntrl,
    validate: {}
})

usersRouter.route({
    method: "POST",
    path: "/",
    handler: createUserCntrl,
    validate: {
        output:{
            200:{
                body: "ok"
            },
            400:{
                body: errorValidators
            },
            500:{
                body: errorValidators
            }
        }
    }
})
usersRouter.route({
    method: "PUT",
    path: "/:id",
    handler: upateUserByIdCntrl,
    validate: {}
})
usersRouter.route({
    method: "DELETE",
    path: "/:id",
    handler: removeUserByIdCntrl,
    validate: {}
})

export default usersRouter;