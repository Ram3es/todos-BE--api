
exports.up = function(knex) {
    return knex.schema
        .createTable("knex-seed-lock", (table)=>{
            table.increments("id");
            table.string("file_name").notNullable()
        })
  
};

exports.down = function(knex) {
  return knex.schema
    .dropTable("knex-seed-lock")
};
