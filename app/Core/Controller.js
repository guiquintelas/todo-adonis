'use strict'

/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {import('lodash')} */
const _ = use('lodash')

class Controller {
  success (response, data, meta) {
    if (_.isNil(data) && _.isNil(meta)) {
      return response.status(204).json()
    }

    return response.json({ data, meta })
  }

  /**
   * @param {Response} response
   */
  created (response) {
    return response
      .status(201)
      .json()
  }

  paginate (response, data) {
    return this.success(response, data.rows, data.pages)
  }
}

module.exports = Controller
