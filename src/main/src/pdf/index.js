import { Poppler } from "node-poppler"
import PDFDocument from 'pdfkit'
import { config } from "../ipcMain";
import path from 'path'
import fs from 'fs-extra'

const poppler = new Poppler()

const defaultOptions = {
  pngFile: true
}

export async function pdfToImg (filename, output, options = defaultOptions) {
  try {

    if (!fs.existsSync(path.join(__dirname, '../assets/outputImg'))) {
      fs.mkdirSync(path.join(__dirname, '../assets/outputImg'))
    }

    await poppler.pdfToCairo(config.pdfFilePath, path.join(__dirname, '../assets/outputImg'), options)
  } catch (e) {
    console.error(e)
  }
}

export function imgToPDF (cb) {
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
    fs.remove(imgDir)
    cb()
  })
}
