
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
//Routing
const url = req.url;
if(url === '/'){
  
  res.write('<html>')
  res.write('<head><title>My First Node page</title></head>')
  res.write('<body><form action ="/message" method="get"><input type="text" name="message"</input></form></body>')
  res.write('</html>');
  return res.end();
}

  res.setHeader('Content-type', 'text/html');
  res.write('<html>')
  res.write('<head><title>My First Node page</title></head>')
  res.write('<body><h1>My First Node Server</h1></body>')
  res.write('</html>');
  res.end();
});

server.listen(5000);