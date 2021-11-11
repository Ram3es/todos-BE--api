import { ParameterizedContext  } from "koa";
import { fetchAllUsers, fetchUserById, createUser, upateUserById, removeUserById } from "../services/Users.service"

 export const fetchAllUsersCntrl = async (ctx: ParameterizedContext) =>{
   const users = await fetchAllUsers();
   ctx.ok(users)  
 }

 export const fetchAllUsersByIdCntrl = async (ctx: ParameterizedContext) =>{
    const { params: { id }  } = ctx
    const user = await fetchUserById(id);
    ctx.ok(user)  
  }
  export const createUserCntrl = async (ctx: ParameterizedContext) =>{

    const { request : { body }  } = ctx
    const newUser = await createUser(body);    // ???????????
     ctx.ok(newUser)  
  }
  export const upateUserByIdCntrl = async (ctx: ParameterizedContext) =>{
    const { body } = ctx.request
    const { id } = ctx.params  
    const updateUser = await upateUserById(id, body )
    ctx.ok(updateUser)
  }
  export const removeUserByIdCntrl = async (ctx: ParameterizedContext) =>{
    const { params: { id } }  = ctx
  
    const response = await removeUserById(id)
    ctx.ok(response)
  }