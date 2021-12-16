import path from 'path'
import fs from 'fs'
import { ipcMain, dialog, BrowserWindow } from 'electron'

export default function initIpcMain (win: BrowserWindow) {
  ipcMain.on('dialog',  (event, type = null, options = { properties: ['openDirectory'] }) => {
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

  ipcMain.on('config',  (event, config) => {
    const p = path.join(__dirname, '/config.js')

    fs.writeFileSync(p, JSON.stringify(config))
  })
}
