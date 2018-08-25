const DefineFile = require('../../../lib/DefineFile')

describe('DefineFile', () => {
  describe('Mapping files', () => {
    it('Should map vue file', () => {
      const { files } = DefineFile.mapFileArgument({ file: './lib/MyFile', type: 'vue' })
      expect(files.length).toEqual(3)
    })
    it('Should map js file', () => {
      const { files } = DefineFile.mapFileArgument({ file: './lib/MyFile', type: 'js' })
      expect(files.length).toEqual(2)
    })

  })

  it('Should separate filename of folder', () => {
    const { fileName, folderName } = DefineFile.splitFilename({ file: './lib/MyName' })
    expect(fileName).toEqual('MyName')
    expect(folderName).toEqual('./lib/')
  })

  describe('Generate Files', () => {
    it('JS file type', () => {
      const fileDefinition = {
        fileName: 'MyName',
        folderName: './lib/',
        appFolder: '~/dev/app/'
      }
      const { fileContent, filePath } = DefineFile.generateFileTypeJs(fileDefinition)
      expect(filePath).toEqual('~/dev/app/lib/MyName.js')
    })

    it('TEST JS file type', () => {
      const fileDefinition = {
        fileName: 'MyName',
        folderName: './lib/',
        appFolder: '~/dev/app/'
      }
      const { fileContent, filePath } = DefineFile.generateFileTypeTestJs(fileDefinition)
      expect(filePath).toEqual('~/dev/app/test/unit/spec/lib/MyName.test.js')
    })

    it('VUE file type', () => {
      const fileDefinition = {
        fileName: 'MyName',
        folderName: './lib/',
        appFolder: '~/dev/app/'
      }
      const { fileContent, filePath } = DefineFile.generateFileTypeVue(fileDefinition)
      expect(filePath).toEqual('~/dev/app/lib/MyName.vue')
    })

    it('TEST VUE file type', () => {
      const fileDefinition = {
        fileName: 'MyName',
        folderName: './lib/',
        appFolder: '~/dev/app/'
      }
      const { fileContent, filePath } = DefineFile.generateFileTypeVueTest(fileDefinition)
      expect(filePath).toEqual('~/dev/app/test/unit/spec/lib/MyName.spec.js')
    })

    it('SCSS file type', () => {
      const fileDefinition = {
        fileName: 'MyName',
        folderName: './lib/',
        appFolder: '~/dev/app/'
      }
      const { fileContent, filePath } = DefineFile.generateFileTypeScss(fileDefinition)
      expect(filePath).toEqual('~/dev/app/lib/MyName.scss')
    })
  })
})
