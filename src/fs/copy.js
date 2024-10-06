// copy.js - implement function that copies folder files files with all its content into folder files_copy at the same level (if files folder doesn't exists or files_copy has already been created Error with message FS operation failed must be thrown)

import fs from 'fs/promises';
import path from 'path';

const copy = async () => {

  const sourceFolder = path.join('files');
  const destinationFolder = path.join('files_copy');

  try {

    await fs.access(sourceFolder);

    try {
      await fs.access(destinationFolder);
      throw new Error('FS operation failed');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    // Copy the directory recursively
    await fs.cp(sourceFolder, destinationFolder, { recursive: true }, err => {
      if (err) {
        throw err;
      }
    });
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await copy();


