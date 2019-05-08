'use strict'

/** @typedef {import('@adonisjs/framework/src/Response')} Response */

class Controller {
  success (response, data, meta) {
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
