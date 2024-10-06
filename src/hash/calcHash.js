import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const calculateHash = async () => {

  const filePath = path.join('files', 'fileToCalculateHashFor.txt');

  try {

    const hash = crypto.createHash('sha256');

    // Create a reading stream from the file
    const fileStream = fs.createReadStream(filePath);

    // Using pipe to transfer data from a file to a hash object
    fileStream.on('data', (chunk) => {
      hash.update(chunk);
    });

    fileStream.on('end', () => {
      console.log(hash.digest('hex'));
    });

    fileStream.on('error', (err) => {
      console.error('Error reading the file:', err);
    });

  } catch (err) {
    console.error('Error:', err);
  }
};

await calculateHash();
