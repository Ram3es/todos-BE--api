import { TodosModel } from "../models/Todos.model";


export const fetchAllTodos = async () =>{
    // row SELECT id,title,completed FROM todos WHERE is_active=true
   return TodosModel.query()
    .select(["id","title","completed"])
    .where({is_active: true})
} 

export const fetchTodoById = async ( id: number ) => {
    //row SELECT * FROM todos WHERE todos.id = id 
    return TodosModel.query().findById(id)
}

export const createTodo = async (todo: any) =>{
    // INSERT todos SET title=somestring, completed = false
    return TodosModel.query().insertAndFetch(todo)
}

export const updateTodoById = async (id: number, todo: any) =>{
    const body = { ...todo, updated_at: new Date(),updated_by: todo.created_by || "Admin" };
    // UPDATE todos SET title=updated string, WHERE todos.id = id
    return TodosModel.query().updateAndFetchById( id, body )
}

export const removeTodoById = async (id: number) =>{
  return TodosModel.query().update({is_active: false}).where({id})  
  // TodosModel.query().deleteById(id)  
}