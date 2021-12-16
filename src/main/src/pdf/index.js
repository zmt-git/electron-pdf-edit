const path = require('path')
const fs = require('fs-extra')
const { Poppler } = require("node-poppler")
const poppler = new Poppler()
const PDFDocument = require('pdfkit')
import { config } from "../ipcMain";

const defaultOptions = {
  pngFile: true
}

async function pdfToImg (filename, output, options = defaultOptions) {
  try {

    if (!fs.existsSync(path.join(__dirname, '../assets/outputImg'))) {
      fs.mkdirSync(path.join(__dirname, '../assets/outputImg'))
    }

    await poppler.pdfToCairo(config.pdfFilePath, path.join(__dirname, '../assets/outputImg'), options)
  } catch (e) {
    console.error(e)
  }
}

function imgToPDF (cb) {
  const doc = new PDFDocument({ size: 'A4'})

  doc.pipe(fs.createWriteStream(`${config.outputFilePath}/${config.outputFilename}`))

  const imgDir = path.join(__dirname, '../assets/outputImg')

  const files = fs.readdirSync(imgDir)

  files.forEach(file => {
    doc.image(`${imgDir}/${file}`, 0, 0, { width: 595.28, height: 841.89 })
    console.log(file)
  })

  doc.end()

  doc.on('finish', () => {
    fs.
    cb()
  })
}

module.exports = {
  pdfToImg,
  imgToPDF
}