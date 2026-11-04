const http = require('node:http');

const server = http.createServer((req, res) => {
    res.end('Hello, Yash Your Server is READY.')
});

server.listen(8000, () => {
    console.log("Your Server is Running on http://localhost:8000")
})



