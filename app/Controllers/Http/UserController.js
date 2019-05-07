'use strict'
const { validate } = use('App/Core/Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */

const User = use('App/Models/User')

class UserController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async create ({ request }) {
    await validate(request.all(), User)

    const user = new User(request.all())
    await user.save()

    return { user }
  }

  async index () {
    return User.all()
  }
}

module.exports = UserController
