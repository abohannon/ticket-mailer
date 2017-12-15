const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const routes = require('./routes');

app.use(bodyParser.json());
app.use(cors());
// TODO: Change cors call for production. Add options and whitelist single domain.
routes(app);

app.listen(3050, () => {
  console.log('Listening on port 3050.');
});
