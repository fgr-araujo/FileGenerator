const ArgumentMap = require('../../../lib/ArgumentMap')

describe('ArgumentMap', () => {
  it('Should receive filename', () => {
    process.argv = [ '', '', '-f', 'filename' ]
    const { file } = ArgumentMap.getArguments()
    expect(file).toEqual('filename')
  })

  it('Should receive type default', () => {
    process.argv = [ '', '', '-f', 'filename' ]
    const { type } = ArgumentMap.getArguments()
    expect(type).toEqual('js')
  })

  it('Should receive parsed type', () => {
    process.argv = [ '', '', '-f', 'filename', '-t', 'vue' ]
    const { type } = ArgumentMap.getArguments()
    expect(type).toEqual('vue')
  })

  it('Should force filename', () => {
    console.error = jest.fn(() => {})
    process.exit = jest.fn(() => {})
    process.argv = [ '', '', '-t', 'vue' ]
    const { type } = ArgumentMap.getArguments()
    expect(console.error).toHaveBeenCalled()
    expect(process.exit).toHaveBeenCalled()
  })
})
