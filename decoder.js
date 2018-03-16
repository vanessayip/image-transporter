/*
* decoding for bitmap ASCII art that's 100x100 size
*
* @param {object} map - hashmap from ascii code to location in txt file
* @param {number} size - number of rows in output file
* @param {string} outputFileName 
* @returns {Promise} - output txt file should be identical to one that inputted into the encoder
*/

const Promise = require("bluebird");
const writeFile = Promise.promisify(require('fs').writeFile);
const fs = require('fs')

module.exports = (map, size, outputFileName) => {
  return new Promise ((resolve) => {
    let mapKeys = Object.keys(map);
    let decodedFile = Array(size);

    //creating empty array of known size
    for (var i = 0; i < size; i++) {
      decodedFile[i] = Array(size);
    }

    //reading the map, and placing the ascii codes in the correct location of the file
    for (var key of mapKeys) {
      for (var pos of map[key]) {
        decodedFile[pos[0]][pos[1]] = key;
      }
    }

    //converting each line of the decoded file into a string
    for (var row = 0; row < decodedFile.length; row++) {
      decodedFile[row] = decodedFile[row].join('');
    }

    resolve(decodedFile.join('\n'));
  })
  .then((writeFileString) => {
    return writeFile(outputFileName, writeFileString, 'ascii') 
  })

  .catch((error) => {
    console.log(`error writing into file: ${error}`)
  }) 
}