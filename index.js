const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');
const morgan = require('morgan');

// Config
dotenv.config({ path: './config/.env' });

// Environment Varibles
const PORT = process.env.PORT || 4000;

// Start Server
const app = express();

// CORS Middleware
app.use(cors());

// Logging Middleware
app.use(morgan('dev'));

// Sessions Middleware
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
     
    }),
  );

// // Routes
app.use('/', require('./routes/index'));

// Server
connectDB().then(() => {
  app.listen(PORT, () => {
      console.log("listening for requests");
  })
})