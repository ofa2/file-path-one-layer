'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Promise = _interopDefault(require('bluebird'));
var fs = _interopDefault(require('fs-extra'));
var path = _interopDefault(require('path'));

async function filePathOneLayer(modelsPath) {
  let fileNames = await fs.readdir(modelsPath);
  let files = await Promise.map(fileNames, fileName => {
    let filePath = path.join(modelsPath, fileName);
    let fileInfo = path.parse(filePath);

    if (fileInfo.ext !== '.js') {
      return null;
    }

    return fs.stat(filePath).then(stat => {
      return Object.assign({
        path: filePath,
        stat
      }, fileInfo);
    });
  });
  return files.filter(file => {
    return file && file.stat && file.stat.isFile();
  });
}

module.exports = filePathOneLayer;
//# sourceMappingURL=bundle.cjs.js.map
