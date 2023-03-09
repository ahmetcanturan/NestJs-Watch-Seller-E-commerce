import Joi from 'joi';

export const CreateProductSchema = Joi.object({
  name: Joi.string().required().min(2).max(70),
  desc: Joi.string().required().min(2).max(300),
  stock: Joi.string().required().min(1),
  price: Joi.string().required().min(1),
  fieldname: Joi.allow(''),
  originalname: Joi.allow(''),
  encoding: Joi.allow(''),
  mimetype: Joi.allow(''),
  destination: Joi.allow(''),
  filename: Joi.allow(''),
  path: Joi.allow(''),
  size: Joi.allow(''),
});
