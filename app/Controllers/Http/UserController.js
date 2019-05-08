'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User')

/** @type {typeof import('../../Core/Controller')} */
const Controller = use('App/Core/Controller')

class UserController extends Controller {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async create ({ request, response }) {
    await User.validateAndCreate(request.all())

    return this.created(response)
  }

  async index ({ request, response }) {
    return this.paginate(response, await User.index(request))
  }
}

module.exports = UserController
