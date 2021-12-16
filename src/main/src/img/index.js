import path from 'path'
import gm from 'gm'

const imageMagick = gm.subClass({ imageMagick: true })

const defaultOptions = {
  fontSize: 12,
  x: 20,
  y: 1670
}

function imgAddText (filepath, text, options = defaultOptions) {
  return new Promise((resolve, reject) => {
    // todo
    const inputPath = path.join(__dirname, `../../public/input/img/${filepath}`)
    const outputPath = path.join(__dirname, `../../public/output/img/${filepath}`)
    const fontPath = path.join(__dirname, '/simsun.ttc')
    imageMagick(inputPath)
      .font(fontPath)
      .fontSize(24)
      .drawText(options.x, options.y, text)
      .write(outputPath, function (err) {
        if (err) { return reject(err) }
        return resolve()
      });
  })
}

module.exports = {
  imgAddText
}