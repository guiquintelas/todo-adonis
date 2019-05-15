'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {import('../../Core/Validator')} */
const { validate } = use('App/Core/Validator')

/** @type {typeof import('../../Models/Token')} */
const Token = use('App/Models/Token')

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User')

const Controller = use('App/Core/Controller')
const BadRequestException = use('App/Exceptions/BadRequestException')

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

    if (!user) {
      throw new BadRequestException('Login inválido!')
    }

    let lastToken = await user.tokens().fetch()

    const lastTokenIds = lastToken.rows.map(el => el.id)

    let token = ''

    try {
      token = await auth.attempt(user.email, password)
    } catch (e) {
      throw new BadRequestException('Senha incorreta!')
    }

    // removing old tokens
    // making possible only one active token at all times
    await Token
      .query()
      .whereIn('id', lastTokenIds)
      .delete()

    return this.success(response, { token })
  }

  /**
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async logout ({ response, auth }) {
    await auth.user.tokens().delete()

    return this.success(response)
  }
}

module.exports = AuthController
