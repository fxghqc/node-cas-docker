'use strict';

const express = require('express');
const path = require('path');
const ConnectCas = require('connect-cas2');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

// Constants
const PORT = 3000;
const SERVICE_PREFIX = process.env.SERVICE_PREFIX
const SERVER_PATH = process.env.SERVER_PATH

// App
const app = express();app.use(cookieParser());
app.use(session({
  store: new FileStore,
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
var casClient = new ConnectCas({
  debug: true,
    ignore: [
      /\/ignore/
    ],
    match: [],
    servicePrefix: SERVICE_PREFIX,
    serverPath: SERVER_PATH,
    paths: {
      validate: '/cas/validate',
      serviceValidate: '/cas/serviceValidate',
      // proxy: '/cas/proxy',
      login: '/cas/login',
      logout: '/cas/logout',
      proxyCallback: ''
    },
    redirect: false,
    gateway: false,
    renew: false,
    slo: true,
    cache: {
      enable: false,
      ttl: 5 * 60 * 1000,
      filter: []
    },
    fromAjax: {
      header: 'x-client-ajax',
      status: 418
    }
});

app.use(casClient.core());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/logout', casClient.logout());
// // or do some logic yourself
// app.get('/logout', function(req, res, next) {
//   // Do whatever you like here, then call the logout middleware
//   casClient.logout()(req, res, next);
// });

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
