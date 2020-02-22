const setupDBConnection = require('./setupDBConnection')

const addUserToDBGateway = async (data) => {
  const client = setupDBConnection()

  const valuesList = `('${data.firstName}' , '${data.lastName}', '${data.email}', '${data.password}')`

  const queryString = `INSERT INTO users(first_name, last_name, email, password) VALUES  ${valuesList} RETURNING *`

  return client.query(queryString, []).then((res) => {
    return {
      message: `User ${
        res.rows.length > 0 ? '' : ' not'
      } added into the database`,
      data: res.rows
    }
  })
    .catch((err) => {
      return {
        message: `Internal error: ${err}`,
        data: err
      }
    })
    .then((data) => {
      client.end()
      return data
    })
}

module.exports = addUserToDBGateway