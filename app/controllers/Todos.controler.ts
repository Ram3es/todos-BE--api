import { fetchAllTodos, fetchTodoById,  createTodo, updateTodoById, removeTodoById } from "../services/Todos.service";
import { ParameterizedContext  } from "koa"


export const fetchAllTodosCntrl = async (ctx: ParameterizedContext) =>{
  try {
    const todos = await fetchAllTodos();
    ctx.ok(todos);

  } catch (error) {
      ctx.throw(error)
      
  }
} 
export const fetchTodoByIdCntrl  = async (ctx: ParameterizedContext) =>{
    const { params:{ id } } = ctx
    try {
    const todo = await fetchTodoById(id)
    ctx.ok(todo)
    } catch (error) {
        ctx.throw(error)
    }
 
} 
export const createTodoCntrl  = async (ctx: ParameterizedContext) =>{
    const { body } = ctx.request
   try {
        const createdTodo = await createTodo(body)
        ctx.ok(createdTodo)
   } catch (error) {
    ctx.throw(error)
   }
 
} 

export const updateTodoByIdCntrl  = async (ctx: ParameterizedContext) =>{
    
    const { params:{ id }} = ctx;
    const { request:{ body } } = ctx
 try {
     
    const updateTodo = await updateTodoById(id, body);
    ctx.ok(updateTodo)

 } catch (error) {
    ctx.throw(error)
 }
    
 
} 
export const removeTodoByIdCntrl  = async (ctx: ParameterizedContext) =>{
    const { params:{ id }} = ctx;
       const removedTodo =  await removeTodoById( id )
       if(removedTodo){
        ctx.ok(id)
       } else {
        ctx.ok("could not delete") 
       }
       // if hard delete -> {ok:1} or {ok:0}
  
   } 