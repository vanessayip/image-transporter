let Promise = require("bluebird");
let readline = require('readline');
let fs = require('fs');
let writeFile = Promise.promisify(require('fs').writeFile);

/*
* encoding for bitmap ASCII art that's 100x100 size
*
* @param {string} filePath
* @returns {Promise} - mapping of ascii code to location in file (using a 2d matrix)
*/
const encoder = (filePath) => {
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

/*
* decoding for bitmap ASCII art that's 100x100 size
*
* @param {object} map - hashmap from ascii code to location in txt file
* @param {number} size - number of rows in output file
* @param {string} outputFileName 
* @returns {Promise} - output txt file should be identical to one that inputted into the encoder
*/

const decoder = (map, size, outputFileName) => {
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

module.exports = {
  encoder,
  decoder,
};

var filePath = 'data.txt';

encoder(filePath)
.then((encoderResult) => {
  console.log('encoder finished');
  return decoder(encoderResult, 100, 'output.txt')
})
.then((decoderResult) => {
  console.log('decoder finished');
});

