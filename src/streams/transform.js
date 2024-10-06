import { Transform } from 'stream';

const transform = async () => {
  // Create a class inherited from Transform that will reverse the text
  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversedChunk = chunk.toString().split('').reverse().join('');
      callback(null, reversedChunk);
    }
  });

  // direct data from stdin to the transformation stream and output it to stdout
  process.stdin.pipe(reverseTransform).pipe(process.stdout);
};

await transform();