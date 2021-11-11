import * as Knex from "knex";
import * as pg from "pg";
import { Model } from "objection"

const knexConfig = require("../knexfile")

Model.knex(knexConfig);
const knexConnection = Knex(knexConfig);

knexConnection
  .raw("select 1+1 as result")
  .then(() => {
    console.log(`Connection successfully completed`);
  })
  .catch((err: Error) => console.log(`Connection error:`, err));

pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value: string) => {
  return parseFloat(value);
});


const knexInstance = Knex(knexConfig);

knexInstance.migrate.latest()
  .then(res => console.log("Migration done", res))
  .catch(err => console.log(err));

knexInstance.seed.run()
  .then(res => console.log("Seeds was runned", res))
  .catch(err => console.log(err))

export default knexInstance