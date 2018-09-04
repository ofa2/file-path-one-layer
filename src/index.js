import Promise from 'bluebird';
import fs from 'fs-extra';
import path from 'path';

async function filePathOneLayer(modelsPath) {
  let fileNames = await fs.readdir(modelsPath);

  let files = await Promise.map(fileNames, (fileName) => {
    let filePath = path.join(modelsPath, fileName);
    let fileInfo = path.parse(filePath);

    if (fileInfo.ext !== '.js' && fileInfo.ext !== '.ts') {
      return null;
    }

    return fs.stat(filePath).then((stat) => {
      return Object.assign(
        {
          path: filePath,
          stat,
        },
        fileInfo
      );
    });
  });

  return files.filter((file) => {
    return file && file.stat && file.stat.isFile();
  });
}

export default filePathOneLayer;
