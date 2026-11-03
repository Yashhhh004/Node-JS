const fs = require('fs')
const path = require('path')

console.log('========== START ==========')

const filePath = path.join(__dirname, 'hello.txt')

// Synchronous
// console.log(fs.readFileSync(filePath, 'utf8'))

// Asynchronous
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})

console.log('==========  END  ==========')
