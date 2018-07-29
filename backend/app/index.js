const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const GenerationEngine = require('./generation/engine');
const accountRouter = require('./api/account');
const dragonRouter = require('./api/dragon');
const generationRouter = require('./api/generation');

const app = express();
const engine = new GenerationEngine();

const origin = 'http://localhost:1234';

engine.start();

app.locals.engine = engine;

app.use(cors({ origin }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/account', accountRouter);
app.use('/dragon', dragonRouter);
app.use('/generation', generationRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error('logging error', err);

  res.status(statusCode).json({
    type: 'error', message: err.message
  });
});


module.exports = app;