  const path = require("path")

exports.seed = async (knex) =>{
 const fileName = path.basename(__filename);
 const existSeed = await knex("knex-seed-lock").where({file_name: fileName}).first()

 if(!existSeed){

  const todos = [
    {title:"text 001"},
    {title:"text 001"},
    {title:"text 001"}
  ]

  await Promise.all(todos.map ( todo => {
    return knex("todos").insert({created_by:"John Smitt", ...todo, completed: false})
  }));
   await knex("knex-seed-lock").insert({file_name: fileName})
  
 };
 


 }

 