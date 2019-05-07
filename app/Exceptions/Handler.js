'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {import('@adonisjs/framework/src/Exception/BaseHandler')} */
const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Request} options.request
   * @param  {Response} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    const errorJson = {
      error: {
        msg: error.message,
        meta: '',
        stack: error.stack.split('\n')
      }
    }

    if (error.meta) {
      errorJson.error.meta = error.meta
    } else {
      delete errorJson.error.meta
    }

    response
      .status(error.status)
      .send(errorJson)
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Request} options.request
   *
   * @return {void}
   */
  // async report (error, { request }) {

  // }
}

module.exports = ExceptionHandler
