const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const cors = require('cors')
const keys = require('./config/keys')
require('./models/User.js')
require('./services/passport')
mongoose.Promise = global.Promise
mongoose.connect(keys.mongoURI)

const app = express()
const routes = require('./routes')

// Middleware
app.use(bodyParser.json())
app.use(cors())
app.set('trust proxy', true)
app.use(session({
  secret: keys.sessionSecret,
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days in milliseconds
}))
// app.use(passport.initialize())
// app.use(passport.session())
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
