const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const logFilePath = path.join(__dirname, 'log.txt')

const server = http.createServer((req, res) => {
    console.log(req.method)

    fs.appendFileSync(logFilePath, `${req.method} Request.method received...! \n`)

    res.end("Responded....!")
})

server.listen(8000, () => {
    console.log("Your server is listening on http://localhost:8000")
})
