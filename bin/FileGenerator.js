#!/usr/bin/env node

const routine = async () => {
  const Arguments = require('../lib/ArgumentMap')
  const DefineFile = require('../lib/DefineFile')
  const CreateFiles = require('../lib/CreateFiles')

  const informedArguments = Arguments.getArguments()
  const { files } = DefineFile.mapFileArgument(informedArguments)
  const createFiles = await CreateFiles({ files })

  console.log('finished')
}

routine()
