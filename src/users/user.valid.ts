import Joi from 'joi';

export const CreateUserSchema = Joi.object({
  name: Joi.string().required().min(2).max(70),
  surname: Joi.string().required().min(2).max(70),
  email: Joi.string().required().max(70),
  password: Joi.string().required().min(5).max(30),
});
