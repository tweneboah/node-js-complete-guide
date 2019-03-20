const http = require('http');


const server = http.createServer((req, res) => {
    
   const url = req.url;
   if(url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text"><button type="submit">Send</button></form></body>');
    res.write('</html>');
   return  res.end()
   }
    res.write('<html>');
    res.write('<head><title>My first node page</title></head>');
    res.write('<body><h1>From node js server</h1></body>');
    res.write('</html>');
    res.end()
})

server.listen(8080)
//this fires at every incoming request

//The request are the http methods
