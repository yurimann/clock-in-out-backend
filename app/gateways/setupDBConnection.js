const { Client } = require('pg/lib')
const dbConfig = require('../config/config').get('db')

const setupDbConnection = () => {
  const db = new Client(dbConfig)
  db.connect()
  return db
}

module.exports = setupDbConnection