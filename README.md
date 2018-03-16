# ASCII Art Encoder/Decoder
A data transport format for efficiently transporting ASCII art


## Install
```
npm install
```

## Usage

```
const encoder = require('./encoder.js');
const decoder = require('./decoder.js');

encoder('./someInputFile')
.then((encoderResult) => {
  //do something with encoder result
})

decoder(mapFromEncoder, numberOfRowsInOutputFile, outputFileName)
.then((decoderResult) => {
  //output file has been created
  //do something
})

```

## Testing

```
npm test
```
## About
### Encoder
The encoder takes in an input file and reads the file line by line. It then maps every character it encounters into a hashmap. The key is the character, and the value is an array of tuples that signifies the location of where the character was seen. The worse case scenario is when all the characters in the file are unique, otherwise, space can be saved when stored this way. Using a hashmap also ensures constant time lookup when decoding.

### Decoder
The decoder takes in 3 parameters: hashmap from the encoder, number of rows that's expected to be in the image to be written in the file, and the output file name. The decoder initializes an empty array of arrays that correspond to the size of the image. It then reads through the hashmap from the encoder and slots the characters into the array of arrays. After some processing, the output is a txt file and its contents are the same as the input file if the encoder and decoder were run successively

