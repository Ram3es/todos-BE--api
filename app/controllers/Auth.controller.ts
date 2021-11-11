import { ParameterizedContext } from "koa";
import { signUp, signIn, verifyToken, deactivateToken, forgotPassword,  } from "../services/Auth.service";
import { createUser, upateUserById, verifyEmail , resetPassword} from "../services/Users.service";
import { UsersModel, Users } from "../models/User.model";


export const signUpRequestCtrl = async (ctx : ParameterizedContext) =>{
  const { body } = ctx.request;
  
   const trx = await UsersModel.startTransaction()
   
    const user: Partial< Users > = await createUser( body, trx )
    const userToken = await signUp( user, trx );
   
    trx.commit()
    ctx.ok()
   
}
export const accountActivationCtrl = async (ctx : ParameterizedContext) =>{
  const { query :{ token } } = ctx
  const { body } = ctx.request

  const userId = await verifyToken(token as string)
  const {id, first_name, last_name } = await upateUserById( userId ,{ ...body, is_active: true})
  await deactivateToken( id )
  
  ctx.ok({first_name, last_name})
}

export const verifyTokenCtrl = async (ctx : ParameterizedContext) =>{
  const { query :{ token } } = ctx

  const result = await verifyToken(token as string)
  ctx.ok(result)
}

export const signInCtrl = async (ctx : ParameterizedContext) =>{
  const { body } = ctx.request
  const token = await signIn(body)
  ctx.ok(token) 
}

export const forgotPasswordCtrl = async (ctx : ParameterizedContext) => {
  const { body: {email} } = ctx.request

  const existUser = await verifyEmail(email)
  const result = await forgotPassword(existUser.id)
  await upateUserById( existUser.id,{ is_active: false })

}
export const resetPasswordCtrl = async (ctx : ParameterizedContext) => {
  const { body } = ctx.request
  const { token } =ctx.query 

  const userId = await verifyToken(token as string)
  const { id } = await resetPassword(body, userId)
  await deactivateToken(id)
  ctx.ok({data : "ok"})
}