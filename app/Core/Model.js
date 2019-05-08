'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = require('@adonisjs/lucid/src/Lucid/Model')

/** @type {import('../Core/Validator')} */
const { validate } = use('App/Core/Validator')

/** @type { typeof import('../Core/ApiResource') } */
const ApiResource = use('App/Core/ApiResource')

class Model extends BaseModel {
  static async validate (fields) {
    await validate(fields, this.validation())
  }

  static validation () {
    throw new Error(`Validation not specified in ${this.name}`)
  }

  /**
   * @returns {import('../Core/ApiResource')}
   */
  static apiResource (request, queryFields) {
    return new ApiResource(request, this, queryFields)
  }

  static async list (request) {
    return this.apiResource(request, [ 'username' ]).make()
  }

  static async index (request) {
    return this.apiResource(request, [ 'username' ]).paginate()
  }

  static boot () {
    super.boot()
  }
}

module.exports = Model
