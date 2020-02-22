const usersValidator = require('../validations/usersValidator')
const userGateway = require('../gateways/userGateway')
const bcrypt = require('bcryptjs')

const usersController = async (args) => {
  if (args.functionToRun === 'addUser') return await userGateway(args)
  else if (args.functionToRun === 'login') {
    const retrievedUser = await userGateway(args)

    const matchedPasswords = args.password === retrievedUser.data.password
    return { message: 'Successfully evaluated results', data: matchedPasswords }
  }
}

module.exports = usersController