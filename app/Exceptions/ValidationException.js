'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ValidationException extends LogicalException {
  constructor ([msg]) {
    super('', 400)
    this.message = msg.message
    this.meta = {
      field: msg.field,
      validation: msg.validation
    }
  }
}

module.exports = ValidationException
