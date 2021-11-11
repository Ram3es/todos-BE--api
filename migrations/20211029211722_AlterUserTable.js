
exports.up = function(knex) {
    return knex.schema.raw(`
    ALTER TABLE users ALTER COLUMN first_name DROP NOT NULL;
    ALTER TABLE users ALTER COLUMN last_name DROP NOT NULL;
    ALTER TABLE users ALTER COLUMN password DROP NOT NULL;
    `)
  
};
 
exports.down = function(knex) {};
