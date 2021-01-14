#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const merge = require('lodash.merge');
const fs = require('fs');

if (argv.sourceFile && argv.targetFile && argv.outputFile) {
    const source = require(argv.sourceFile);
    const target = require(argv.targetFile);

    merge(target, source);

   fs.writeFileSync(argv.outputFile, JSON.stringify(target, null, 2).replace("•", "\u2022"));
   console.log('[COMPLETED}\n');

} else {
    console.log('Run the command as ./copy.js --sourceFile newTranslations.json --targetFile existingTranslations.json --outputFile result.json');
}

function copyData (obj, currentParent, parse) {
    for (var k in obj) {
      if (typeof obj[k] === 'object' && obj[k] !== null) {
        parseObjectProperties(obj[k], `${currentParent}${k}.`, parse)
      } else if (obj.hasOwnProperty(k)) {
        parse(currentParent + k)
      }
    }
  }