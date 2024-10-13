import * as joi from 'joi';

export const JoiValidationSchema = joi.object({
  // NODE_ENV: joi.string().valid('dev', 'prod', 'test').default('dev'),
  MONGODB: joi.required(),
  PORT: joi.number().default(3005),
  //ojo como se use la validacion por defecto toma el 6 como string
  DEFAULT_LIMIT: joi.number().default(6),
});
