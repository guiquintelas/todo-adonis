'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = require('@adonisjs/lucid/src/Lucid/Model')

/** @type {import('../Core/Validator')} */
const { validate } = use('App/Core/Validator')

/** @type { typeof import('../Core/ApiResource') } */
const ApiResource = use('App/Core/ApiResource')

/** @type {import('lodash')} */
const _ = use('lodash')

class Model extends BaseModel {
  /**
   * @returns {import('../Core/ApiResource')}
   */
  static apiResource (request, queryFields) {
    return new ApiResource(request, this, queryFields)
  }

  static list (request) {
    return this.apiResource(request, [ 'username' ])
  }

  static index (request) {
    return this.apiResource(request, [ 'username' ])
  }

  static get fillable () {
    return []
  }

  async validate (fields) {
    await validate(fields, this.constructor.validation)
  }

  setFillables (fields) {
    this.merge(_.pick(fields, this.constructor.fillable))
  }

  async validateWithoutRequired (fields) {
    let validation = this.constructor.validation

    _.forIn(validation, (rules, field) => {
      if (_.isArray(rules)) {
        throw new Error('Rules must be string!')
      }

      // converts to array
      validation[field] = rules.split('|')

      // removes any rule tha includes required
      _.remove(validation[field], el => el.includes('required'))

      if (validation[field].length === 0) {
        delete validation[field]
      } else {
        // sets as string again
        validation[field] = validation[field].join('|')
      }
    })

    await validate(fields, validation)
  }

  static validation () {
    throw new Error(`Validation not specified in ${this.name}`)
  }

  static async validateAndCreate (fields) {
    throw new Error('validateAndCreate was not defined!')
  }

  async validateAndUpdate (fields) {
    throw new Error('validateAndUpdate was not defined!')
  }

  static boot () {
    super.boot()
  }
}

module.exports = Model
