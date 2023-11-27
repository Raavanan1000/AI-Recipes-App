import * as Joi from 'joi';

const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('prod', 'dev', 'test').default('dev'),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
  SECRET_KEY: Joi.string().required(),
  EXPIRES_IN: Joi.number().required(),
});

export default validationSchema;
