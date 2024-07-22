import Joi from "joi";

const createSchema = Joi.object({
  unit: Joi.string().required(),
  value: Joi.number().required(),
  type: Joi.string().valid('consumption', 'state').required(),
});

export { createSchema };
