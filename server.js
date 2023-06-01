const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect.js');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const cors = require('cors');

// Google Auth
const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');


const port = process.env.PORT || 3000;
const app = express();

app
  .use(bodyParser.json())
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
    res.setHeader("Access-Controll-Allow-Origin", "*");
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
app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
app.use(cors({ origin: '*' }))








// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listLabels(auth) {
  const gmail = google.gmail({version: 'v1', auth});
  const res = await gmail.users.labels.list({
    userId: 'me',
  });
  const labels = res.data.labels;
  if (!labels || labels.length === 0) {
    console.log('No labels found.');
    return;
  }
  console.log('Labels:');
  labels.forEach((label) => {
    console.log(`- ${label.name}`);
  });
}

authorize().then(listLabels).catch(console.error);

// passport.use(new GitHubStrategy({
//   clientID: process.env.GITHUB_CLIENT_ID,
//   clientSecret: process.env.GITHUB_CLIENT_SECRET,
//   callbackURL: process.env.CALLBACK_URL
// },
//   function (accessToken, refreshToken, profile, done) {
//     //User.findorCreate({githubId: profile.id }, function (err, user) {
//     return done(null, profile);
//     //}));
//   }
// ));

// passport.serializeUser((user, done) => {
//   done(null, user);
// });
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out") });

// app.get('/github/callback', passport.authenticate('github', {
//   failureRedirect: '/api-docs', session: false
// }),
//   (req, res) => {
//     req.session.user = req.user;
//     res.redirect('/');
//   });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.CALLBACK_URL,
//     },
//     function (accessToken, refreshToken, profile, done) {
//       return done(null, profile);
//     }
//   )
// );

// // NOTE: Apparently, this is not used
// // passport.serializeUser((user, done) => {
// //   done(null, user);
// // });
// // passport.deserializeUser((user, done) => {
// //   done(null, user);
// // });

// app.get("/logged-status", (req, res) => {
//   res.send(
//     req.session.user !== undefined
//       ? `Logged in as ${req.session.user.displayName}`
//       : "Logged Out"
//   );
// });

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/api-docs",
//     session: false,
//   }),
//   customer.createCustomer
// );

// process.on("uncaughtException", (err, origin) => {
//   console.log(
//     process.stderr.fd,
//     `Caught exception: ${err}\n` + `Exception origin: ${origin}`
//   );
// });



mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
