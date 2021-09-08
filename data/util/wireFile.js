const path = require('path')
const fs = require('fs')

const basePath = path.join(__dirname, '../', './dist')

function writeFile(fileName, data) {
  const url = path.join(basePath, fileName)

  fs.writeFileSync(url, data)
}

module.exports = {
  writeFile
}
