const fs = require('fs')

// Sync
// fs.writeFileSync("hello.txt", "Hello, Yash")

// Async
// fs.writeFile("hello.txt", "Hello, Yash",
//     (err) => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log("File Written Successfully")
//         }
//     }
// )

// Async Promise Based
// async function createFile(){
//     fs.promises.writeFile('test.txt', "Content is Here...")
// }

// createFile()


// Append Content in file 
// fs.appendFile("hello.txt", "\nAppended line by Yash!", (err) => {
//   if (err) {
//     console.log("Error appending:", err);
//   } else {
//     console.log("Content appended successfully!");
//   }
// });

// Create directory and sub directory 
// fs.mkdir("parentFolder/subFolder", { recursive: true }, (err) => {
//   if (err) {
//     console.log("Error creating directory:", err);
//   } else {
//     console.log("Directories created successfully!");
//   }
// });

// create directory and add some content in that 
// fs.mkdir("myFolder", { recursive: true }, (err) => {
//   if (err) {
//     console.log("Error creating folder:", err);
//   } else {
//     fs.writeFile("myFolder/info.txt", "File created inside myFolder!", (writeErr) => {
//       if (writeErr) {
//         console.log("Error creating file inside folder:", writeErr);
//       } else {
//         console.log("File created inside directory successfully!");
//       }
//     });
//   }
// });
