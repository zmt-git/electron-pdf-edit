import { ipcMain, dialog, BrowserWindow } from 'electron'
import { imgAddText } from '../img'
import { pdfToImg, imgToPDF } from '../pdf'
import { getPNGFlies } from '../file'
import fs from 'fs-extra'
import readline from 'readline'
import path from 'path'

export let config = {
  pdfFilePath: '',
  txtFilePath: '',
  outputFilePath: '',
  outputFilename: '',
  x: '',
  y: ''
}

export const dir = {
  pending: './assets/PendingImg',
  resolve: './assets/resolveImg',
}

export default function initIpcMain (win: BrowserWindow) {
  ipcMain.on('dialog',  (event: Electron.IpcMainEvent, type: string, options = { properties: ['openDirectory'] }) => {
    const result = dialog.showOpenDialogSync(options)
    event.reply('dialog', type, result)
  })


  ipcMain.on('window',  (event, methodName: string) => {
    switch (methodName) {
      case 'minimize': win.minimize()
        break
      case 'close' : win.close()
        break
      default: console.log(methodName)
    }
  })

  ipcMain.on('config',  async (event, c: typeof config) => {
    event.reply('pending')
    
    try {
      config = c

      event.reply('msg', 'PDF转换中...')
      // pdf转img
      await pdfToImg()

      event.reply('msg', 'PDF转换完成')

      event.reply('msg', 'PDF添加文字中...')
  
      // 读取txt文件，
      const rl = readline.createInterface({
        input: fs.createReadStream(config.txtFilePath)
      })

      let i = 0

      // 获取待处理图片文件名
      const imgFiles = getPNGFlies()

      const p: Promise<any>[] = []

      // 逐行读取txt文件，向待处理图片添加文字， 添加到promise.all
      rl.on('line', (data) => {
        p.push(imgAddText(imgFiles[i], data, { x: parseFloat(config.x), y: parseFloat(config.y), fontSize: 12 }))
      })

      // 开始处理图片添加文字
      await Promise.all(p)

      event.reply('msg', 'PDF添加文字完成')

      // 异步删除生成的待处理图片
      fs.remove(path.join(__dirname, dir.pending))

      event.reply('msg', 'PDF生成中...')

      // 已添加文字图片生成PDF文件
      imgToPDF(() => {
        event.reply('msg', 'PDF生成完成')
        event.reply('success')
        // PDF文件生成后，删除已添加文字图片
        fs.removeSync(path.join(__dirname, dir.resolve))
      })
    } catch (e) {
      event.reply('error', e)
    }
  })
}
