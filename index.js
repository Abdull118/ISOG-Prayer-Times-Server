const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const connectDB = require('./config/db');
const morgan = require('morgan');

// Config
dotenv.config({ path: './config/.env' });

// Environment Variables
const PORT = process.env.PORT || 4000;

// Start Server
const app = express();

// Middleware and static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS Middleware
app.use(cors());

// Logging Middleware
app.use(morgan('dev'));

// Sessions Middleware
const MongoStore = connectMongo(session);

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Routes
app.use('/api/', require('./routes/index'));

// Connect to Database and Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests on PORT", PORT);
  });
});

// Export the app for serverless deployment
module.exports = app;
