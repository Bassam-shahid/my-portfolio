import Joi from 'joi';

/**
 * Contact form validation schema
 * @type {Joi.ObjectSchema}
 */
export const contactSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(1)
    .max(100)
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 1 character',
      'string.max': 'Name must not exceed 100 characters',
      'any.required': 'Name is required'
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Must be a valid email address',
      'any.required': 'Email is required'
    }),
  message: Joi.string()
    .required()
    .min(10)
    .max(2000)
    .messages({
      'string.empty': 'Message is required',
      'string.min': 'Message must be at least 10 characters',
      'string.max': 'Message must not exceed 2000 characters',
      'any.required': 'Message is required'
    })
});

/**
 * Validate request body against schema
 * @param {Joi.ObjectSchema} schema - Joi schema
 * @param {object} data - Data to validate
 * @returns {{ error?: object, value?: object }} Validation result
 */
export function validateData(schema, data) {
  return schema.validate(data, { abortEarly: false });
}

export default { contactSchema, validateData };
