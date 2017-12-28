/* global describe, it: true */
const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../index.js')
const assert = require('assert')
const User = mongoose.model('users')

describe('Create user', () => {
  it('Saves a user', (done) => {
    const user = new User({
      firstName: 'TestName',
      email: 'test@test.com',
      password: 'password'
    })

    user.save()
      .then(() => {
        User.findOne({ firstName: 'TestName' })
          .then((user) => {
            assert(user !== null)
            done()
          })
      })
  })
})
