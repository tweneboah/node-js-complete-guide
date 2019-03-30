const express = require('express');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

// app.get('/', (req, res) => {
//     res.send({hi: 'My first deployment'})
// }); 

passport.use(new googleStrategy({
    clientID: keys.googleClientID,
    clientSecrete: keys.googleClientSecrete,
    callbackURL: '/auth/google/callback'
  }, (accessToken)=> {
      console.log(accessToken)
  })
)


app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);

