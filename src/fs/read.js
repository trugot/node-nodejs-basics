// read.js - implement function that prints content of the fileToRead.txt into console (if there's no file fileToRead.txt Error with message FS operation failed must be thrown)

import fs from 'fs/promises';
import path from 'path';

const read = async () => {
  const fileToRead = path.join("files", "fileToRead.txt");
  try {
    // check if dir exists
    await fs.access(fileToRead);

    // read files in dir

    const file = await fs.readFile(fileToRead, 'utf8');
    console.log(file);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      throw err;
    }
  }
};

await read();