const fsp = require('fs').promises;
const path = require('path');

module.exports = async (fileName) => {
  const pathToFile = path.join(__dirname, '../data', fileName);

  return fsp.readFile(pathToFile, 'utf8')
    .then((data) => [JSON.parse(data), null])
    .catch((error) => [null, error]);
};
