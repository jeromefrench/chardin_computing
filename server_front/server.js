console.log(__dirname + '/../dist/development');
require('dotenv').config();
const express = require('express');
const history = require('connect-history-api-fallback');
const app = express();

const staticFileMiddleware = express.static(__dirname + process.env.STATIC_DIR);
app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(staticFileMiddleware);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
