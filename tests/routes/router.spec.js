const router = require('../../app/routes/router')
const request = require('supertest')
const express = require('express')

jest.mock('../../app/controllers/usersController')
const usersController = require('../../app/controllers/usersController')

const app = express()

app.use('/', router)

describe('GET /health', () => {
    it('must respond with json', (done) => {
        request(app)
            .get('/health')
            .expect('Content-Type', /json/)
            .expect(
                200,
                {
                    appName: 'himama',
                    version: packageJSON.version,
                    status: 'Running'
                },
                done
            )
    })
})

describe('POST /addUser', () => {
  it('respond with json', (done) => {
    const entryName = "Test Name"
    const response = {
      message: 'Successfully added user',
      data: entryName,
      success: true
    }

    usersController.mockResolvedValue(response)

    const userToBeAdded = { user: entryName }
    request(app)
      .post('/addUser')
      .send(userToBeAdded)
      .set('Accept', 'application/json')
      .expect(200, done)
    })
})