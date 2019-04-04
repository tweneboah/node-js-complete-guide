const express = require('express');
const hbs = require("hbs");

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public/"))

app.get('/', (req, res)=>{
   // res.send('<h1>Hello Express</h1>')
  res.render("home.hbs", {
     pageTitle: "Home page",
     welcomeMessage: "welcome to my express site",
     currentYear: new Date().getFullYear()
  })
});

app.get('/about', (req, res) =>{
  res.render("about.hbs", {
     pageTitle: "About Page",
     currentYear: new Date().getFullYear()
  })
});

app.get("/bad", (req, res) => {
   res.send({
      errorMessage: "Unable to handle request"
   });
})
app.listen(3000, () => {
   console.log('Server is up on port 300')
});
