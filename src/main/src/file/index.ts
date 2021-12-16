import fs from 'fs-extra'
import path from 'path'
import { dir } from '../ipcMain'

export function getPNGFlies () {
  const dirs = path.join(__dirname, dir.pending)
  let files = fs.readdirSync(dirs)
  return files.filter(file => path.extname(file) === '.png')
}
