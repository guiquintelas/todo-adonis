/** @type {import('@adonisjs/validator/src/Validator')}  */
const Validator = use('Validator')
const ValidationException = require('../Exceptions/ValidationException')

module.exports.validate = async (values, modelClass) => {
  if (!modelClass.validation()) {
    throw new Error(`Validation not specified in ${modelClass.name}`)
  }

  const validation = await Validator.validate(values, modelClass.validation())

  if (validation.fails()) {
    throw new ValidationException(validation.messages())
  }
}
