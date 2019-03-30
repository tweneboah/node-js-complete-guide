const express = require('express');

const app = express();
app.use((req,res,next)=>{
    console.log("Chill Bro");
    res.send('dfdfdfd')
    next();
});
app.use('/users',(req,res,next)=>{
    console.log("In First Middleware");
    res.send("<h1>Hola!!</h1>")
})

app.use('/',(req,res,next)=>{
    console.log("In Second Middleware");
    res.send("<h1>Hola!!</h1>")
})
app.listen(8080);