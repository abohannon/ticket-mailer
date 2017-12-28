/* global describe, it: true */
const request = require('supertest')
const assert = require('assert')
const app = require('../index.js')

describe('GET /api/', () => {
  it('responds with Shopify collection data', (done) => {
    request(app)
      .get('/api/collections')
      .end((err, res) => {
        if (err) done(err)
        assert(res.body[0].collection_id)
        done()
      })
  })

  it('responds with Shopify product data', (done) => {
    request(app)
      .get('/api/products')
      .end((err, res) => {
        if (err) done(err)
        assert(res.body[0].product_id)
        done()
      })
  })
})
