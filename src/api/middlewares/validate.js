const Joi = require('joi')

const validateBody = (schema) => {
  return (req, res, next) => {
    const { value, error } = schema.validate(req.body)
    if (error) return res.status(400).json(error.details[0].message)
    next()
  }
}

const authSignUpSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

const authSignInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

module.exports = {
  validateBody,
  authSignUpSchema,
  authSignInSchema,
}
