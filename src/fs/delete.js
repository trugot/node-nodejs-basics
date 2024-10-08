import fs from 'fs/promises';
import path from 'path';


const remove = async () => {
  const filePath = path.join("files", 'fileToRemove.txt');

  try {
    await fs.unlink(filePath);
    console.log('File deleted successfully');
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      throw err;
    }
  }
};

await remove();