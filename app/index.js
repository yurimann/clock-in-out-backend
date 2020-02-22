const express = require('express')
const config = require('./config/config')

const router = require('./routes/router')

const start = async () => {
    const app = new express()

    app.use('/', router)

    const server = app.listen(config.get('app.port'), () => {
    
        console.log(
            config.get('app.name') +
            ' is listening at ' +
            config.get('app.host') +
            ':' +
            server.address().port
        )
    })
}
start()