import fs from 'fs';
import path from 'path';

const write = async () => {
  const filePath = path.join('files', 'fileToWrite.txt');

  // Create a stream to write to a file
  const writeStream = fs.createWriteStream(filePath);

  // Passing data from stdin to a file
  process.stdin.pipe(writeStream);

  writeStream.on('finish', () => {
    console.log('Data written to file successfully');
  });

  writeStream.on('error', (err) => {
    console.error('Error writing to the file:', err);
  });
};

await write();