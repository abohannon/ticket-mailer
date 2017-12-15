const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const routes = require('./routes')

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'))
}

app.use(bodyParser.json())
app.use(cors())
// TODO: Change cors call for production. Add options and whitelist single domain.
routes(app)

const PORT = process.env.PORT || 3050
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})
