const ArgumentParser = require('argparse').ArgumentParser

const createParser = () => {
  const parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'FileGenerator arguments'
  })

  parser.addArgument(
    [ '-f', '--file' ],
    {
      help: `Enter the complete filename.\n
      Example:
      -f ./folder1/folder2/FileName`
    }
  )

  parser.addArgument(
    [ '-t', '--type' ],
    {
      help: `The type of the file. It can be 'vue' or 'js'`
    }
  )

  return parser
}

const getArguments = () => {
  const parser = createParser()
  const args = parser.parseArgs()

  const file = args.file
  const type = args.type || 'js'

  if (!file) {
    console.error('You need to provide a filename')
    process.exit(1)
  }

  const result = { file, type }
  return result
}

exports.getArguments = getArguments
