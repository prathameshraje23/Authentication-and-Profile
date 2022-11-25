//JWT - Json Web Tokens
//here we will do kind of authentication using JWT
//token for now consider a long string
//here we are not dealing with database, do it later 
//but we are using additional layer of validation using Joi package
//JWT -> consist header,payload & signature which all is encoded 
//see documentation of it on jwt.io
//we need jsonwebtoken package, so install it

require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const mainRouter = require('./routes/main');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1',mainRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
