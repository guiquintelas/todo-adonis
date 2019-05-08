'use strict'

const Model = use('App/Core/Model')

/** @type {import('lodash')} */
const _ = use('lodash')

class ApiResource {
  /**
   * @param  {import('@adonisjs/framework/src/Request')} request
   * @param  {Array} queryFields
   */
  constructor (request, modelClass, queryFields) {
    this.request = request

    this.queryFields = queryFields
    if (_.indexOf(this.queryFields, 'id') < 0) {
      this.queryFields = ['id', ...this.queryFields]
    }

    /** @type {string} */
    this.modelClass = modelClass

    if (modelClass instanceof Model.constructor) {
      this.modelClass = `App/Models/${modelClass.name}`
      /** @type {typeof import('./Model')} */
      this.modelClassInstance = modelClass
    } else {
      this.modelClass = modelClass
      /** @type {typeof import('./Model')} */
      this.modelClassInstance = use(`App/Models/${modelClass}`)
    }

    this.isPaginate = false
    this.page = 1
    this.perPageDefault = 10
    this.perPage = this.perPageDefault
  }

  async make () {
    let query = this.modelClassInstance
      .query()
      .select(...this.queryFields)

    if (this.isPaginate) {
      this.getPaginateParams()
      return query.paginate(this.page, this.perPage)
    }

    return query.fetch()
  }

  async paginate () {
    this.isPaginate = true

    return this.make()
  }

  getPaginateParams () {
    this.page = this.request.input('page') ? this.request.input('page') : 1
    this.perPage = this.request.input('per_page') ? this.request.input('per_page') : this.perPageDefault
  }
}

module.exports = ApiResource
