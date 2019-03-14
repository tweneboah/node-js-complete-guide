

//Dependencies
const http = require('http');
const url = require('url');

//The server should respond to all request with a string

const server = http.createServer((req, res) => {
    // Get the url and pass it
    let parsedUrl = url.parse(req.url, true);

    //Get the path of the url
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/\/+|\/+$/g, '');

    //get the query string as an object
    let queryStringObject = parsedUrl.query;

    //Get http reques
    let method = req.method.toLowerCase();

    //Get the Headers as an object
    let headers = req.headers;

    //Send the response
    res.end('Hello word');

    //log the response
    console.log(headers)
 
});


//Start the server, and have it listen on port 3000
server.listen(5000, () => {
    console.log('The server is listening on port 3000 now')
})