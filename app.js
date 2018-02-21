const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connected to Database
mongoose.connect(config.database, {
  useMongoClient: true
});

// On connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
})

// On error
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
})

const app = express();

const users = require('./routes/users');

// Port number
const port = 3000;

// Cors Middleware
app.use(cors());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser Middleware
app.use(bodyParser.json());

app.use('/users', users);

// Index route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
})

// Start server
app.listen(port, () =>{
  console.log('Server started on port ' + port);
})
