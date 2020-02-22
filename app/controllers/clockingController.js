const clockingGateway = require('../gateways/clockingGateway')
const clockingController = async (args) => {
    return await clockingGateway(args)
}
module.exports = clockingController