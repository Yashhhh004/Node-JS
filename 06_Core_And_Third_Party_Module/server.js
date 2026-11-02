// const fs = require('fs')

// fs.writeFile('abc.txt', "Hello this is Yash", (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("File Written Successfully")
//     }
// })

// const path = require('path');

// console.log(__dirname)
// console.log(__filename)

// const newPath = path.join(__dirname, "./alpha/beta.js")
// console.log(newPath)


// const os = require('os');

// console.log(os.platform())

// import fs from 'node:fs'

// fs.writeFile(
//     'example.js',
//     'console.log("hello, YASH")',
//     (err) => {
//         if (err) {
//             console.log("ERROR: ", err)
//         } else {
//             console.log("File Written Successfully")
//         }
//     }
// )

import express from 'express'

const server = express()

server.get('/', (req, res) => {
    res.send([
        {
            name: 'Yash',
        }
    ])
})

server.listen(8000, () => {
    console.log("Server is listening on http://localhost:8000")
})
