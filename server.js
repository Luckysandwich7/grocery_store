const express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect.js');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

 //const users = require('./routes/users') 

const port = process.env.PORT || 3000;
const app = express();

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cookieParser())
  /* .use('/', users) */
  .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }))
  
  // This is the basic expres session({..}) initialization.
  .use(passport.initialize())
  // init pasport on every route call
  .use(passport.session())
  // allow passport to use "express-session"
  .use("/", require("./routes/index.js"))
  .use((req, res, next) => {
    res.setHeader("Access-Controll-Allow-Origin", "*")
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
      );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
  })
  app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
  app.use(cors({ origin: '*'}))

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  //User.findorCreate({githubId: profile.id }, function (err, user) {
    return done(null, profile);
  //}));
}
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  });

module.exports = app;

  // added 5/26/23 
  function userReportHandler(req, res) {
    res.render('userreport', { title: 'Users Report' });
  }
  
  app.get('/users/report', userReportHandler);
  // end 5/26 modification

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

