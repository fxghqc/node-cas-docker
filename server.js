'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

// Constants
const PORT = 3000;
const APP_NAME = process.env.APP_NAME || 'app';
const USE_CAS = process.env.USE_CAS === 'false'
  ? false : true;
let casClient;

const sessionOptions = {
  store: new FileStore,
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  name: 'kmx.' + APP_NAME + '.connect.sid'
};

// App
const app = express();
app.use(cookieParser());
app.use(session(sessionOptions));


if (USE_CAS) {
  casClient = require('./src/casClient');
  app.use(casClient.core());
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (USE_CAS) {
  app.get('/logout', function(req, res, next) {
    // req.session.destroy(function (err) {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     // clearCookie will make slo not working.
    //     res.clearCookie(sessionOptions.name);
    casClient.logout()(req, res, next);
    //   }
    // });
  });
}

app.use(express.static('public'));

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});
app.post('*', function (request, response) {
  console.log(request);
});

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('app listening at http://%s:%s', host, port);
});
