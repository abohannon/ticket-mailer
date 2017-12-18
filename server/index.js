const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const cors = require('cors')
const keys = require('./config/keys')
require('./models/User.js')
mongoose.Promise = global.Promise
mongoose.connect(keys.mongoURI)

const app = express()
const routes = require('./routes')

app.use(bodyParser.json())
app.use(cors())
// TODO: Change cors call for production. Add options and whitelist single domain.
routes(app)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 3050
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})
