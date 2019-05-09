'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Jwt')} Auth */

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User')

/** @type {typeof import('../../Core/Controller')} */
const Controller = use('App/Core/Controller')

class UserController extends Controller {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async create ({ request, response }) {
    await User.validateAndCreate(request.all())

    return this.created(response)
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async selfUpdate ({ request, response, auth }) {
    const user = await auth.getUser()

    await user.validateAndUpdate(request.all())

    return this.success(response, user)
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    const users = await User.index(request).paginate()

    return this.paginate(response, users)
  }
}

module.exports = UserController
