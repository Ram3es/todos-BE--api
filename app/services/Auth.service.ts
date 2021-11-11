import { throws } from "assert";
import { STATUS_CODES } from "http";
import * as jwt from "jsonwebtoken";
import { Transaction } from "objection";
import { UserTokensModel } from "../models/UserTokens.model";
import { UsersModel, Users } from "../models/User.model";
import * as bcrypt from "bcrypt";
import { MAILGUN } from "../constants/global"


const config = require("../../config").default;
const mailgun = require("mailgun-js")({apiKey:MAILGUN.API_KEY,domain: MAILGUN.DOMAIN,})
 

export const signUp = async( user: Partial< Users >, trx: Transaction, ) =>{
  const { id , email } = user
  let time = new Date()
 
  const token = jwt.sign({
       exp:  time.setDate(time.getDate() + 1), 
       data: id
}, config.SECRET_KEY); 

 const userToken  = await UserTokensModel.query(trx).insert({user_id: id , is_active: true, token })
 const data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: email,
  subject: 'Hello',
  html: `<a href={{http://localhost:3001/activation?token=${userToken}}}> http://localhost:3001/activation?token=${userToken.token}</a>`
 }
 mailgun.messages().send(data);

 return userToken
}

export const verifyToken = async (token: string) =>{ 
  const existToken = await UserTokensModel.query().select(["user_id","token"]).where({ token }).first()
  
  const decoded = jwt.verify(existToken.token, config.SECRET_KEY) as jwt.JwtPayload
  
  if(decoded && decoded.exp > new Date().getTime() ) { 
    const existUser = await UsersModel.query().where({ id: decoded.data, is_active: true }).first()
    
    if(!existUser){
      return decoded.data
    }else{
      throw Error ("User already exist")
    }

  } else {
    throw Error ("Token has been expired")
  }
} 

export const deactivateToken = (id: number) =>{
  return UserTokensModel.query().update({is_active: false}).where({ user_id: id })
}

interface IsignIn {
  email: string; password: string;
}
export const signIn = async ({ email, password }: IsignIn) =>{
  const existUser = await UsersModel.query().modify("defaultSelects").where({ email }).first()

  if(!existUser){
    throw {status: 403, message:" User with such Email doesn`t exist "}
  } else {
    const result = bcrypt.compareSync(password, existUser.password)

    if(result){
     const {password, ...data } = existUser

      let time = new Date()
      const token = jwt.sign({
           exp:  time.setDate(time.getDate() + 3), 
           data,
        }, config.AUTH_SECRET_KEY)

     return token

    } else {
      throw {status: 403, message:" Forbidden"}
    }
  }
}
export const forgotPassword = (user_id: number) =>{
  let time = new Date()
  const token = jwt.sign({
       exp:  time.setDate(time.getDate() + 1), 
       data: user_id
}, config.SECRET_KEY);

// send mail

return UserTokensModel.query().update({ is_active: true, token }).where({user_id})
}

