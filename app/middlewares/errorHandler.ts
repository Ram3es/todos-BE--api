import * as Koa from "koa";

export default async (ctx: Koa.Context , next: () => Promise<any>  ) => {
    try {
        await next()
    } catch (err) {
     console.log(err , "handler middleware");
     
        ctx.body = {
            code: ctx.status,
            message: err.message
        }


        ctx.app.emit("error",err, ctx)
        
    }
}