/*
encode
i: txt file - array 100x100 of ascii code (0-255)
o: hash map

read file - line by line, buffer stream, whole file
for each code(key), put location [x, y] into value

or alternatively
string compression
aaabbc -> a3b2c

*/

let readline = require('readline');
let fs = require('fs');

const encoder = (filePath) => {
  return new Promise ((resolve) => {
    const map = {};
    let lineNumber = 0;
    let fileInterface = readline.createInterface({
      input: fs.createReadStream(filePath),
    });

    fileInterface.on('line', (line) => {
      let imgLine = JSON.parse(line).split('');


    });

    fileInterface.on('close', () => {
      fileInterface.close();
      resolve(result);
    });
  });

}