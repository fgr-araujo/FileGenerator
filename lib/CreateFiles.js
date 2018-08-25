const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

const CreateFile = async ({ files }) => {
  for (let file in files) {
    await createFolder(files[file].filePath)
    fs.writeFileSync(files[file].filePath, files[file].fileContent)
  }

  return Promise.resolve(true)
}

const createFolder = async (file) => {
  const pathName = path.dirname(file)

  if (!fs.existsSync(pathName)) {
    return new Promise((resolve, reject) => {
      mkdirp(pathName, () => {
        resolve()
      })
    })
  }
}

module.exports = CreateFile
