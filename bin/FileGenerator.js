#!/usr/bin/env node
const path = require('path')
const fs = require('fs')



const routine = async () => {
  const Arguments = require('../lib/ArgumentMap')
  const DefineFile = require('../lib/DefineFile')
  const CreateFiles = require('../lib/CreateFiles')

  const informedArguments = Arguments.getArguments()
  const { files } = DefineFile.mapFileArgument(informedArguments)
  const createFiles = await CreateFiles({ files })

  console.log('Success!')
}

routine()
