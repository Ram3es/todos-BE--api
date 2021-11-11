// Update with your config settings.

module.exports = {
  client: 'pg',
  connection: {
    host: "0.0.0.0",
  database: "localdb",
  user: "postgres",
  password: "7777",
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};