
// const path = require('path');
// const http = require('http')
// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// //Routes
// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

// //APP.SET()
// //This helps us to global value that can be accsess across our app
// app.set('view engine', 'ejs')
// app.set('views', 'views')

// //MIDDLEWARES
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname, 'public')));

// //ROUTES
// app.use('/admin', adminRoutes.router);
// app.use(shopRoutes);




// //404 PAGE

// //Note that express route read from top to bottom so any route that does not meet the above routes the rout below it get rendered

// app.use((req, res, next) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });

// // //SERVER
// const sever =  http.createServer(app);
// sever.listen(3000, () => {
//  console.log('Server is runing')
// })


const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);
