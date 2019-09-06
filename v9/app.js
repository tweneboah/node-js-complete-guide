

//=======================
//READDING AND CREATING PDFS
//=======================
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const multer = require('multer');
const Product = require('./models/product');
const fs = require('fs');



const app = express();



//MULTER CONFI
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images') //This means accepting the image
  },
  filename: (req, file, cb ) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
})


//Filtering
const fileFilter = (req, file, cb) => {
   if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
     cb(null, true) //This means accept
   }else {
     cb(null, false) //Reject
   }
}


app.use(multer({storage : fileStorage, fileFilter}).single('image')) //the image holds the data in our form

//Middleware
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))



//DB
const url = 'mongodb://localhost/File-Uploads'
mongoose.connect( url, {
useNewUrlParser: true,
useCreateIndex: true,
useFindAndModify: false
})
.then(() => console.log("DB Connected successfully"));


//ROUTES


app.get('/add', (req, res) => {
  res.render('admin/edit-product')
})

//multer is use to extract incoming files

app.post('/add', (req, res) => {


 let item = req.body.item;
 let quantity = req.body.quantity;
 let  image = req.file
 
  if(image) {
    image = image.path
  }

  Product.create({item: item, quantity: quantity, image: image}, (err, product) => {
    if(err){
      console.log(err)
    }else {
      console.log(product)
      res.send(product)
    }
  })
})


//READING INVOICES
app.get('/invoice', (req, res, next) => {
    const invoiceName = 'invoice' + '.pdf';
    const invoicePath = path.join('data', 'invoices', invoiceName);
    // fs.readFile(invoicePath, (err, data) => {
    //   if(err){
    //     return next(err)
    //   }else {
    //     res.setHeader('Content-Type', 'application/pdf');
    //    res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
    //     res.send(data)
    //   }
    // })

    //USING STREAMS AND BUFFERS
    const file = fs.createReadStream(invoicePath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');

    file.pipe(res)

})


//PAGINATION

const ITEMS_PER_PAGE = 2;

//This means on page i will fetch item 1, 2 page 2 ; 3, 4...

app.get('/',  (req, res) => {

  const page = req.query.page;
  
      Product.find()
     .skip((page - 1) * ITEMS_PER_PAGE)
     .limit(ITEMS_PER_PAGE)
     .then((products) => {
      res.render('products', {products: products})
     })
   

})

app.listen(3000, () => {
 console.log(`The server is up and runing`);
})