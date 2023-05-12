const path = require('path')
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.on('closed', () => {
    console.log('closed')
  })

  win.loadFile('src/templates/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  app.on('browser-window-created', () => {
    fWin = BrowserWindow.getFocusedWindow()
    fWin.on('closed', () => {
      console.log('fWin closed')
    })
  })

  console.log('main process')
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})