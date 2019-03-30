const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('HI am Advance in Node Js')
})


app.listen(3000, (req, res) => {
    console.log('Server is running on port 3000')
})
