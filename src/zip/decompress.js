import fs from 'fs';
import zlib from "zlib";
import path from 'path';

const decompress = async () => {
  const inputFilePath = path.join('files', 'archive.gz');
  const outputFilePath = path.join('files', 'fileToCompress.txt');

  // Create an archive reading stream, an unpacking stream, and a file writing stream
  const readStream = fs.createReadStream(inputFilePath);
  const writeStream = fs.createWriteStream(outputFilePath);
  const gunzip = zlib.createGunzip();

  // Passing data from readStream via gunzip to writeStream
  readStream.pipe(gunzip).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log('File decompressed successfully');
  });

  writeStream.on('error', (err) => {
    console.error('Error during decompression:', err);
  });
};

await decompress();
