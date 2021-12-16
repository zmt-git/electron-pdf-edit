import path from 'path'
import gm from 'gm'
import { dir } from '../ipcMain'
import fs from 'fs-extra'
const imageMagick = gm.subClass({ imageMagick: true })

const defaultOptions = {
  fontSize: 12,
  x: 20,
  y: 1670
}

function imgAddText (imgName: string, text: string, options = defaultOptions) {
  return new Promise((resolve, reject) => {
    const inputPath = path.join(__dirname, `${dir.pending}/${imgName}`)

    const outputPath = path.join(__dirname, `${dir.resolve}/${imgName}`)

    if (!fs.existsSync(path.join(__dirname, dir.resolve))) {
      fs.mkdirSync(path.join(__dirname, dir.resolve))
    }

    const fontPath = path.join(__dirname, '/simsun.ttc')
    imageMagick(inputPath)
      .font(fontPath)
      .fontSize(24)
      .drawText(options.x, options.y, text)
      .write(outputPath, function (err: Error | null) {
        if (err) { return reject(err) }
        return resolve(true)
      });
  })
}

module.exports = {
  imgAddText
}