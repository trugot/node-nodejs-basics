// create.js - implement function that creates new file fresh.txt with content I am fresh and young inside of the files folder (if file already exists Error with message FS operation failed must be thrown)

import fs from 'fs/promises';
import path from 'path';

const create = async () => {

  const filePath = path.join('files', 'fresh.txt');

  try {
    // Checking if the file exists
    await fs.access(filePath);
    throw new Error('FS operation failed');
  } catch (err) {
    // If the error was caused by the file not being found, create it
    if (err.code === 'ENOENT') {

      await fs.writeFile(filePath, 'I am fresh and young');
    } else {

      throw err;
    }
  }
};

await create();