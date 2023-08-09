var express = require('express');
var env = require('dotenv').config()
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dbConfig = require('./config/db.config');

mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var index = require('./routes/authRoutes');
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Server is started on http://127.0.0.1:'+PORT);
});
