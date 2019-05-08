const _ = use('lodash')

module.exports = {
  name: 'requiredIfNot',
  async fn (data, field, message, args, get) {
    // check if request has specified field
    if (!_.has(data, args)) {
      if (!data[field]) {
        throw new Error(`O campo ${field} é obrigatório!`)
      }
    }

    if (!data) {
      throw message
    }
  }
}
