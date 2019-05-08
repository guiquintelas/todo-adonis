/** @type {import('@adonisjs/validator/src/Validator')}  */
const Validator = use('Validator')
const ValidationException = require('../Exceptions/ValidationException')

module.exports.validate = async (values, rules) => {
  const validation = await Validator.validate(values, rules)

  if (validation.fails()) {
    throw new ValidationException(validation.messages())
  }
}
