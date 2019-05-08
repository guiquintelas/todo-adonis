'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class BadRequestException extends LogicalException {
  constructor (msg) {
    super('', 400)
    this.message = msg
  }
}

module.exports = BadRequestException
