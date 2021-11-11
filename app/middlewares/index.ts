import * as cors from "koa2-cors";
import * as bodyparser from "koa-bodyparser";
import bodyParserOptios from  "./bodyparser.options";
import corsOptions from  "./cors.options";
import respondOptions from "./respond.options";
//@ts-ignore
import * as respond from "koa-respond";
//@ts-ignore
import { compose } from "koa-convert";
//@ts-ignore
import * as responseTime from "koa-response-time";
import errorHandler from "./errorHandler"

const commonMiddlewares = () => 
  compose([
      responseTime(),
      cors(corsOptions),
      bodyparser(bodyParserOptios),
      respond(respondOptions),
      errorHandler
  ])
  export { commonMiddlewares }