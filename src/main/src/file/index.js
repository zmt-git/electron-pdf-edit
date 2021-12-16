const fs = require('fs')
const path = require('path')
const loading = require('loading-cli')

/*
* @return string[]
* */
function getPNGFlies () {
  const load = loading({ color: 'blue' }).start('读取图片')
  const dir = path.join(__dirname,'../../public/input/img')
  let files = fs.readdirSync(dir)
  load.stop()
  return files.filter(file => path.extname(file) === '.png')
}

function readTxtLine () {

}

module.exports = {
  getPNGFlies
}