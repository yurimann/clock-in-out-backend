const setupDBConnection = require('./setupDBConnection')

const userGateway = async (data) => {
  const client = setupDBConnection()
  const hashedPassword = data.password
    // bcrypt.hashSync(data.password, 8)
  const valuesList = `('${data.firstName}' , '${data.lastName}', '${data.email}', '${hashedPassword}')`

  if (data.functionToRun === 'addUser'){
  const queryString = `INSERT INTO users(first_name, last_name, user_name, email, password) VALUES  ${valuesList} RETURNING *`

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
} else if (data.functionToRun === 'login') {
    const queryString = `SELECT * FROM users WHERE email='${data.email}'`

    return client.query(queryString, []).then((res) => {
      return {
        message: 'User retrieved from the database',
        data: res.rows[0]
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
}

module.exports = userGateway