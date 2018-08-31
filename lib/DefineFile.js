const path = require('path')
const fs = require('fs')
const paramCase = require('param-case')

const ConfigFile = fs.readFileSync(`${path.resolve('./')}/.filegenrc`)
const ConfigFileParsed = JSON.parse(ConfigFile)
const DefineFile = {}

DefineFile.mapFileArgument = ({ file, type }) => {
  const { fileName, folderName } = DefineFile.splitFilename({ file })
  const fileInfo = {
    appFolder: path.resolve('./'),
    folderName,
    fileName
  }

  let files = []
  switch (type) {
    case 'vue':
      files.push(DefineFile.generateFileTypeVue(fileInfo))
      files.push(DefineFile.generateFileTypeVueTest(fileInfo))
      files.push(DefineFile.generateFileTypeScss(fileInfo))
      break

    case 'js':
      files.push(DefineFile.generateFileTypeJs(fileInfo))
      files.push(DefineFile.generateFileTypeTestJs(fileInfo))
      break

    default:
      break
  }

  return { files }
}

DefineFile.splitFilename = ({ file }) => {
  const splitedParts = file.split(/\//gi)
  const fileName = splitedParts[splitedParts.length - 1]
  delete splitedParts[splitedParts.length - 1]
  const folderName = splitedParts.join('/')
  return { folderName, fileName }
}

DefineFile.generateFileTypeJs = ({ appFolder, folderName, fileName }) => {
  filePath = path.join(appFolder, ConfigFileParsed.sourcePath, folderName, `${fileName}.js`)
  fileContent = ''

  return { fileContent, filePath }
}

DefineFile.generateFileTypeTestJs = ({ appFolder, folderName, fileName }) => {
  filePath = path.join(appFolder, ConfigFileParsed.unitTestPath, folderName, `${fileName}.test.js`)
  filePathToTest = path.join(folderName, `${fileName}.test.js`)
  fileContent = `import ${fileName} from '${ConfigFileParsed.resolveSourcePath}${filePathToTest}'

describe('${fileName}', () => {
  it('Should Fail', () => {
    expect(false).toBeTruthy()
  })
})
`

  return { fileContent, filePath }
}

DefineFile.generateFileTypeVue = ({ appFolder, folderName, fileName }) => {
  filePath = path.join(appFolder, ConfigFileParsed.sourcePath, folderName, `${fileName}.vue`)
  const className = paramCase(fileName)

  fileContent = `<style src="./${fileName}.scss" lang="scss" scoped></style>
<template lang="html">
  <section class="${className}">

  </section>
</template>

<script>
export default {
  name: '${fileName}'
}
</script>
`

  return { fileContent, filePath }
}

DefineFile.generateFileTypeVueTest = ({ appFolder, folderName, fileName }) => {
  filePath = path.join(appFolder, ConfigFileParsed.unitTestPath, folderName, `${fileName}.spec.js`)
  filePathToTest = path.join(folderName, `${fileName}.vue`)
  fileContent = `import { shallowMount } from '@vue/test-utils'
import ${fileName} from '${ConfigFileParsed.resolveSourcePath}${filePathToTest}'

describe('${fileName}', () => {
  it('Should render with correct name', () => {
    const wrapper = shallowMount(${fileName})
    expect(wrapper.vm.$options.name).toEqual('${fileName}')
  })
})
`

  return { fileContent, filePath }
}

DefineFile.generateFileTypeScss = ({ appFolder, folderName, fileName }) => {
  filePath = path.join(appFolder, ConfigFileParsed.sourcePath, folderName, `${fileName}.scss`)
  const className = paramCase(fileName)

  fileContent = `.${className} {}`

  return { fileContent, filePath }
}

module.exports = DefineFile
