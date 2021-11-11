
import { UsersModel } from "../models/User.model";
import { Transaction } from "objection";
import * as bcrypt from "bcrypt";



export const getHashedPassword = ( password: string ) =>{
    const rounds = 10;
    const salt = bcrypt.genSaltSync(rounds)
    return bcrypt.hashSync(password, salt)
  }


export const fetchAllUsers = () =>{
    return UsersModel.query()
        .select(["id", "first_name","last_name","email", "password"])
        .where({ is_active: true })
}

export const fetchUserById = ( id : number) => {
    return UsersModel.query().findById( id )       
}

export const createUser = async ( { email } : { email: string } , trx?: Transaction ) => {
    const existEmail = await UsersModel.query().where({email}).first()
    if(existEmail){ 
        throw Error("User with such Email already exist") }

    return UsersModel.query(trx).insertAndFetch( { email, created_by: "auth"} ) 
}

export const upateUserById = (id: number, data: {[key: string]: string | number | boolean} ) =>{
    if (data.password){
        data.password = getHashedPassword(data.password as string)
    }
    
    const body = {...data, updated_at: new Date() }
    return UsersModel.query().updateAndFetchById(id , body )

}
export const removeUserById = async (id: number ) =>{
  
    return UsersModel.query().deleteById(id)
}

export const verifyEmail = async ( email : string ) =>{
 console.log(email,"service e mail");
 
 const existUser = await UsersModel.query().select(["email", "is_active", "id"]).where({email}).first()
  
 if(existUser){
  return existUser
 } else {
     throw Error ("User with such email doesn`t exist")
 }

}  
export const resetPassword = async ({password}: {password: string}, user_id: number) => {

    return  await UsersModel.query().updateAndFetchById(user_id,{ is_active: true ,password: getHashedPassword(password)})
   }
