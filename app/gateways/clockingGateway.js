const moment = require('moment-timezone')
const setupDBConnection = require('./setupDBConnection')

const clockingGateway = async (data) => {
  const client = setupDBConnection()
  const timeNow = new Date().toUTCString()

  const clockInOrOut = async (data) => {
    const checkUserStatus = await client.query(`SELECT * from clocking WHERE user_id='${data.userId}' AND (clock_out IS NULL OR clock_out='')  LIMIT 1`)

    const valuesList = `('${data.userId}', '${timeNow}')`

    const evalInOrOut = () => {
      if (checkUserStatus.rows.length > 0) {

        if (checkUserStatus.rows[0].clock_in !== '') {
          console.log(checkUserStatus.rows[0])
          return `UPDATE clocking SET clock_out='${timeNow}' where clocking_id='${checkUserStatus.rows[0].clocking_id}' RETURNING *`}
        else {
          console.log('here')
          return `UPDATE clocking SET clock_in='${timeNow}' where clocking_id='${checkUserStatus.rows[0].clocking_id}' RETURNING *`}
      } else return `INSERT INTO clocking(user_id, clock_in) VALUES  ${valuesList} RETURNING *`
    }

    return await client.query(evalInOrOut(), []).then((res) => {
      return {
        message: 'User action successful',
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

  const editEntry = async (data) => {
    const clockQueryString = `UPDATE clocking SET ${data.field}='${data.updatedValue}' where clocking_id='${data.clockingId}' RETURNING *`
    return await client.query(clockQueryString, []).then((res) => {
      return {
        message: 'Successfully updated',
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

  const userLogs = async (data) => {
    const clockQueryString = `SELECT * from clocking where user_id='${data.userId}' ORDER BY clock_in DESC LIMIT 20`
    return await client.query(clockQueryString, []).then((res) => {
      return {
        message: 'Successfully retrieved list',
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

  switch (data.functionToRun) {
    case 'clockInOrOut':
      return await clockInOrOut(data)
    case 'editEntry':
      return await editEntry(data)
    case 'userLogs':
      return await userLogs(data)
  }
}
module.exports = clockingGateway