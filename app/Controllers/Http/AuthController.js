'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {import('../../Core/Validator')} */
const { validate } = use('App/Core/Validator')

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User')

const Controller = use('App/Core/Controller')

class AuthController extends Controller {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async login ({ request, response, auth }) {
    await validate(request.all(), {
      login: 'required',
      password: 'required'
    })

    const { login, password } = request.all()

    const user = await User
      .query()
      .where('email', login)
      .orWhere('username', login)
      .first()

    const token = await user.login(auth, password)

    this.success(response, { token })
  }

  /**
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async detail ({ response, auth }) {
    return this.success(response, auth.user)
  }
}

module.exports = AuthController
