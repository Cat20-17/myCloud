const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const corsOptions = require('./middlewares/corsConfig');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = config.get('serverPort');
const dbUrl = config.get('dbUrl');

app.use(express.json());
app.use(cors(corsOptions));
app.use(router);
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(dbUrl)
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    })
  } catch (e) {
    console.error(e);
  }
}

start();