const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = ('./routes//admin')
const shopRoutes = ('./routes//shop.js')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

//Addmin Router
app.use(adminRoutes);

//Shop route
app.use(shopRoutes);




app.listen(3000);
