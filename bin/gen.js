#!/usr/bin/env node

const { argv } = require('node:process')
const filePath = __dirname
const currentPath = process.cwd()
const nunjucks = require('nunjucks')
const fs = require('fs')
const path = require('path')

console.log('argv:', argv)
// console.log('filePath:' + filePath)
// console.log('currentPath:' + currentPath)

argv.shift()
argv.shift()
console.log(argv)

const data = {
  model: argv[0],
  attr: {},
}

for (let i = 1; i < argv.length; i++) {
  const attr = argv[i].split(':')
  const key = attr[0]
  const value = attr[1]

  data.attr[key] = value
}

console.log(data)

const tpl = fs.readFileSync(path.join(__dirname, './gen.tpl')).toString()

const compiledData = nunjucks.renderString(tpl, data)

console.log(compiledData)

fs.writeFileSync(currentPath + '/gen.js', compiledData)
