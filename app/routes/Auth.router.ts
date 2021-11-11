import * as Router from "koa-joi-router";
import { errorValidators, signUpResponse, signUpRequest} from "../shared/validators";
import { signUpRequestCtrl, accountActivationCtrl, verifyTokenCtrl, signInCtrl, forgotPasswordCtrl, resetPasswordCtrl  } from "../controllers/Auth.controller"

const authRouter =  Router();
authRouter.prefix("/auth")

authRouter.route({
    method: "POST",
    path:"/",
    handler: signUpRequestCtrl,
    validate: {
        type:"json",
        body: signUpRequest ,
        output:{
            200:{
                body: signUpResponse
            },
            204:{
                body: signUpResponse
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
authRouter.route({
    method: "POST",
    path:"/account-activation",
    handler: accountActivationCtrl,
    validate: {}
})
authRouter.route({
    method: "GET",
    path:"/verify-token",
    handler: verifyTokenCtrl,
    validate: {}
})
authRouter.route({
    method: "POST",
    path:"/login",
    handler: signInCtrl,
    validate: {}
})
authRouter.route({
    method: "PUT",
    path:"/forgot-password",
    handler: forgotPasswordCtrl,
    validate: {}
})
authRouter.route({
    method: "POST",
    path:"/reset-password",
    handler: resetPasswordCtrl,
    validate: {}
})
export default authRouter