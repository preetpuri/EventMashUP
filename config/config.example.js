
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    db: 'mongodb://localhost/noobjs_dev',
    root: rootPath,
    app: {
      name: 'Event Mash Up'
    },
    facebook: {
      clientID: "631660140263248",
      clientSecret: "29853ca1a9c09fc5b4403a0410150113",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    twitter: {
      clientID: "CONSUMER_KEY",
      clientSecret: "CONSUMER_SECRET",
      callbackURL: "http://APP_URL/auth/twitter/callback"
    },
    github: {
      clientID: 'APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'http://APP_URL/auth/github/callback'
    },
    google: {
      clientID: "APP_ID",
      clientSecret: "APP_SECRET",
      callbackURL: "http://APP_URL/auth/google/callback"
    },
    meetup: {
        clientID: "t812pfkk088c8rn2kf1s1bie06",
        clientSecret: '9m3scdq42su21e4492628rcj4s',
        callbackURL: 'http://localhost:3000/auth/meetup/callback'
      },
  },
  test: {
    db: 'mongodb://localhost/noobjs_test',
    root: rootPath,
    app: {
      name: 'Nodejs Express Mongoose Demo'
    },
    facebook: {
      clientID: "APP_ID",
      clientSecret: "APP_SECRET",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    twitter: {
      clientID: "CONSUMER_KEY",
      clientSecret: "CONSUMER_SECRET",
      callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    github: {
      clientID: 'APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    google: {
      clientID: "APP_ID",
      clientSecret: "APP_SECRET",
      callbackURL: "http://localhost:3000/auth/google/callback"
    }
  },
  production: {}
};
