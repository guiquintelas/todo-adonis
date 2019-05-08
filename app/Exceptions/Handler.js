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
        meta: ''
      }
    }

    if (error.meta) {
      errorJson.error.meta = error.meta
      delete errorJson.error.meta.validation
    } else {
      delete errorJson.error.meta
    }

    if (error.status === 500) {
      errorJson.error.stack = error.stack.split('\n')
    }

    if (error.code === 'E_INVALID_JWT_TOKEN') {
      errorJson.error.msg = 'Você precisa estar logado!'
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
