import fs from 'fs';
import path from 'path';

const read = async () => {
  const filePath = path.join('files', 'fileToRead.txt');

  const fileStream = fs.createReadStream(filePath, 'utf-8');

  fileStream.pipe(process.stdout);

  fileStream.on('error', (err) => {
    console.error('Error reading the file:', err);
  });

};

await read(); 