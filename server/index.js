const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const routes = require('./routes')

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use(bodyParser.json())
app.use(cors())
// TODO: Change cors call for production. Add options and whitelist single domain.
routes(app)

const PORT = process.env.PORT || 3050
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})
