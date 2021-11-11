import { Joi } from "koa-joi-router";

export const errorValidators = Joi.object({
    code: Joi.string().required(),
    message: Joi.string().required()
})