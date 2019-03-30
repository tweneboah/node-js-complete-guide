const express = require('express');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// app.get('/', (req, res) => {
//     res.send({hi: 'My first deployment'})
// });

//CLIENT ID: 609420201316-tcme6njchh9h4ee1n7rfr98ti2hm18qp.apps.googleusercontent.com
//CLIENT SECRETE   CeJ9_wULCXF6Shfsa8oWCsTe
passport.use(new googleStrategy())

const PORT = process.env.PORT || 5000;
app.listen(PORT);