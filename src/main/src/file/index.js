import fs from 'fs-extra'
import path from 'path'
/*
* @return string[]
* */
export function getPNGFlies () {
  const dir = path.join(__dirname,'../../public/input/img')
  let files = fs.readdirSync(dir)
  return files.filter(file => path.extname(file) === '.png')
}
