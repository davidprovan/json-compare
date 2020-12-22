#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

let sourceElements = [];
let targetElements = [];

if (argv.sourceFile && argv.targetFile) {
    const source = require(argv.sourceFile);
    parseObjectProperties(source, '', function(key){
        sourceElements.push(key);
    });
    
    const target = require(argv.targetFile);
    parseObjectProperties(target, '', function(key){
        targetElements.push(key);
    });

    sourceElements.forEach(currentElement => {
        if(targetElements.indexOf(currentElement) === -1){
            console.log('[MISSING] - ' + currentElement);
        }
    });

  } else {
    console.log('Run the command as ./index.js --sourceFile test.json --targetFile testAgainst.json');
  }

  function parseObjectProperties (obj, currentParent, parse) {
    for (var k in obj) {
      if (typeof obj[k] === 'object' && obj[k] !== null) {
        parseObjectProperties(obj[k], `${currentParent}${k}.`, parse)
      } else if (obj.hasOwnProperty(k)) {
        parse(currentParent + k)
      }
    }
  }