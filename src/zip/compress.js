import fs from 'fs';
import zlib from "zlib";
import path from 'path';

const compress = async () => {
  const inputFilePath = path.join('files', 'fileToCompress.txt');
  const outputFilePath = path.join('files', 'archive.gz');

  // Create a file reading stream, a compression stream and an archive writing stream
  const readStream = fs.createReadStream(inputFilePath);
  const writeStream = fs.createWriteStream(outputFilePath);
  const gzip = zlib.createGzip();

  // Transferring data from readStream via gzip to writeStream
  readStream.pipe(gzip).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log('File compressed successfully');
  });

  writeStream.on('error', (err) => {
    console.error('Error during compression:', err);
  });
};

await compress();
