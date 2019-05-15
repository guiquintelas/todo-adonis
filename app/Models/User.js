'use strict'

/** @type {typeof import('../Core/Model')} */
const Model = require('../Core/Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

const BadRequestException = use('App/Exceptions/BadRequestException')

class User extends Model {
  static index (request) {
    return this.apiResource(request, [
      'username',
      'email'
    ])
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

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  static boot () {
    super.boot()

    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
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
}

module.exports = User
