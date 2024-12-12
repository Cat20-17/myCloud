const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const corsOptions = require('./middlewares/corsConfig');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.SERVER_PORT || 5000;
const dbUrl = process.env.DB_URL;

app.use(express.json());
app.use(cookieParser());
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