import fs from 'fs/promises';
import path from 'path';

const list = async () => {
  const sourceDir = path.join("files");
  try {
    // check if dir exists
    await fs.access(sourceDir);

    // read files in dir
    const files = await fs.readdir(sourceDir);
    console.log(files);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      throw err;
    }
  }
};

await list();