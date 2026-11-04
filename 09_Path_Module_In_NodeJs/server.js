// let path = 'user/yash/data.js'

// let path1 = 'user\yash\data.js'

const path = require('node:path')

let myPath = path.join('user', 'yash', 'data.js');
let myAbsolutePath = path.resolve('user', 'yash', 'data.js');
let pathObj = path.parse(myPath)

console.log(myPath)
console.log(path.basename(myPath))
console.log(path.extname(myPath))
console.log(path.dirname(myPath))
console.log(path.parse(myPath))
console.log(path.normalize(myPath))
console.log(pathObj)
console.log(path.isAbsolute(myPath))
console.log(myAbsolutePath)

