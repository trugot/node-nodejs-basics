// rename.js - implement function that renames file wrongFilename.txt to properFilename with extension .md (if there's no file wrongFilename.txt or properFilename.md already exists Error with message FS operation failed must be thrown)
import fs from 'fs/promises';
import path from 'path';


const rename = async () => {

  const oldFileName = path.join('files', 'wrongFilename.txt');
  const newFileName = path.join('files', 'properFilename.md');

  try {
    await fs.access(oldFileName);

    try {
      await fs.access(newFileName);
      throw new Error('FS operation failed');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }
    // Rename the file asynchronously
    await fs.rename(oldFileName, newFileName, (err) => {
      if (err) {
        throw new Error('FS operation failed');
      }
    });

  } catch (error) {
    throw new Error("FS operation failed");
  }


};

await rename();