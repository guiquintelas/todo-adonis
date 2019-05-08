const { hooks } = require('@adonisjs/ignitor')
const fs = require('fs')

const rulesFolder = 'app/Rules/'

hooks.after.providersBooted(() => {
  const Validator = use('Validator')

  fs.readdir(rulesFolder, (err, files) => {
    if (err) {
      throw err
    }

    for (const file of files) {
      const { name, fn } = require(`../${rulesFolder}${file}`)

      Validator.extend(name, fn)
    }
  })
})
