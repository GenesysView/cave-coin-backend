/* var config = {};
if (process.env.NODE_ENV == 'pro') {
  config = {
    server: {
      host: 'localhost',
      port: process.env.PORT || 3000
    },
    secret: 'chatsure2017'
  }
}
if (process.env.NODE_ENV == 'dev' || !process.env.NODE_ENV) {
  config = {
    server: {
      host: 'localhost',
      port: process.env.PORT || 3010
    },
    secret: 'chatsure2017'
  }
}
if (process.env.NODE_ENV == 'test') {
  config = {
    server: {
      host: 'localhost',
      port: process.env.PORT || 3020
    },
    secret: 'chatsure2018'
  }
} */

var   config = {
  server: {
    host: 'www.cavecoin.app',
    port: process.env.PORT || 3010,
    securePort: process.env.PORT || 3011
  },
  secret: 'chatsure2017'
}
module.exports = config