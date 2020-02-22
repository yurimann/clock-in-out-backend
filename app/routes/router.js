const router = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const packageJSON = require('../../package')
const config = require('../config/config')
const usersController = require('../controllers/usersController')
const clockingController = require('../controllers/clockingController')

router.use(cors(config.get('corsOptions')))

router.use(bodyParser.json({ extended: true }))

router.get('/health', (req, res) => {
    res.status(200).send({
        appName: packageJSON.name,
        version: packageJSON.version,
        status: 'Running'
    })
})

router.get('/userLogs', async(req, res) => {
    console.log(req.query)
    const userLogs = await clockingController({userId: req.query.userId, functionToRun: 'userLogs'})
    res.status(200).send({
        message: userLogs.message,
        logs: userLogs.data
    })
})

router.post('/addUser', async(req, res) => {
    if (req.body !== undefined){
        const userResponse = await usersController({...req.body, functionToRun: 'addUser'} )
        res.status(201).send({
            message: userResponse.message,
            data: userResponse.data
        })
    }
})

router.post('/login', async(req, res) => {
    if (req.body !== undefined){
        const userResponse = await usersController({...req.body, functionToRun: 'login'})
console.log(userResponse)
        if (userResponse.data){
        res.status(200).send({
            message: userResponse.message,
            data: userResponse.data
        })} else {
        res.status(401).send({
            message: 'Passwords do not match',
            data: userResponse.data
        })}
    }
})

router.post('/clock', async(req, res) => {
    if (req.body !== undefined){
        const clockResponse = await clockingController(({...req.body, functionToRun: 'clockInOrOut'}))
        res.status(200).send({
            message: clockResponse.message,
            data: clockResponse.data
        })
    }
})

router.put('/editEntry', async(req, res) => {
    if (req.body !== undefined){
        const clockResponse = await clockingController({...req.body, functionToRun: 'editEntry'})
        res.status(200).send({
            message: clockResponse.message,
            data: clockResponse.data
        })
    }
})
module.exports = router