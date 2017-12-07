const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./routes');

app.use(bodyParser.json());
routes(app);

app.listen(3050, () => {
  console.log('Listening on port 3050.');
});
