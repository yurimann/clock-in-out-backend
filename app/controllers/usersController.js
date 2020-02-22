const usersValidator = require('../validations/usersValidator')
const addUserToDBGateway = require('../gateways/addUserToDBGateway')

const usersController = async(args) => {
  return addUserToDBGateway(args)

}

module.exports = usersController