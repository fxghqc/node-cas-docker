'use strict';

const ConnectCas = require('connect-cas2');

const SERVICE_PREFIX = process.env.SERVICE_PREFIX;
const SERVER_PATH = process.env.SERVER_PATH;

module.exports = new ConnectCas({
  debug: true,
  ignore: [
    /\/ignore/,
    /^.*\.js$/,  // ignore webpack react router splitted codes
    /^.*\.css$/  // ignore css codes
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
  restletIntegration: null,
  redirect: function (req, res) {
    if (req.session.lastUrl.indexOf('cas-info') >= 0 &&
      req.header('x-client-fetch')) {
      return '/'
    }
  },
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
