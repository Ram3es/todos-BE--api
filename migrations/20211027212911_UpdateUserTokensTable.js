
exports.up = function(knex) {
    return knex.schema.table("user_tokens", table => {
        table.string("email")
    })
  
};

exports.down = function(knex) {
    return knex.schema.table("user_tokens", table =>{
        table.dropColumn("email")
    })
  
};
