const path = require('path')
const fs = require('fs')
const CreateFiles = require('../../../lib/CreateFiles')

describe('CreateFiles', () => {
  it('Should create files with correct args', async () => {
    const files = [
      {
        fileContent: 'file content',
        filePath: `${path.resolve('./')}/sandbox/sub-folder/MyFile.vue`
      }
    ]
    const createdFiles = await CreateFiles({ files })
    expect(fs.existsSync(files[0].filePath)).toBeTruthy()
    fs.unlinkSync(files[0].filePath)
  })
})
