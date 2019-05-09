'use strict'

/** @type {typeof import('../Core/Model')} */
const Model = require('../Core/Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

const BadRequestException = use('App/Exceptions/BadRequestException')

class User extends Model {
  async login (auth, password) {
    try {
      return auth.attempt(this.email, password)
    } catch (e) {
      throw new BadRequestException('Senha incorreta!')
    }
  }

  static get hidden () {
    return ['password']
  }

  static get fillable () {
    return [
      'username',
      'email'
    ]
  }

  static get validation () {
    return {
      username: 'required|unique:users,username',
      email: 'required|email|unique:users,email',
      password: 'required'
    }
  }

  static async validateAndCreate (fields) {
    const user = new User()
    await user.validate(fields)
    user.setFillables(fields)
    await user.save()

    return user
  }

  async validateAndUpdate (fields) {
    await this.validateWithoutRequired(fields)

    this.setFillables(fields)
    await this.save()

    return this
  }

  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
