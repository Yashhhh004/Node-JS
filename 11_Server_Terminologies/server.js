const http = require('node:http')
const fs = require('fs')
const path = require('node:path')

const logFilePath = path.join(__dirname, 'log.txt')

const server = http.createServer((req, res) => {
    console.log("Request Received...!")

    // console.log(req)
    // console.log(req.method)
    // console.log(req.url)

    const date = new Date().toLocaleString();
    const content = `New Request received, DATE: ${date}, url: ${req.url} \n`

    fs.appendFile(logFilePath, content, (err) => {
        if (err) {
            console.error("Error writing log:", err)
        } else {
            console.log("Request logged successfully...")
        }
    })
    
    res.end("Hello Yash, This is Response From Server")
})

server.listen(8000, () => {
    console.log("Server is running on http://localhost:8000")
})
