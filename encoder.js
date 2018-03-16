/*
* encoding for bitmap ASCII art that's 100x100 size
*
* @param {string} filePath
* @returns {Promise} - mapping of ascii code to location in file (using a 2d matrix)
*/

let readline = require('readline');
let fs = require('fs');

module.exports = (filePath) => {
  return new Promise ((resolve) => {
    const map = {};
    let lineNumber = -1;
    let fileInterface = readline.createInterface({
      input: fs.createReadStream(filePath),
    });

    fileInterface.on('line', (line) => {
      lineNumber += 1;
      let imgLine = line.split('');

      //create mapping of each character to its location
      for (var i = 0; i < imgLine.length; i++) {
        if (!map.hasOwnProperty(imgLine[i])) {
          map[imgLine[i]] = [];
        }
        map[imgLine[i]].push([lineNumber, i]);
      }

    });

    fileInterface.on('close', () => {
      fileInterface.close();
      resolve(map);
    });
  });

}