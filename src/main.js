const path = require('path')
const { app, BrowserWindow } = require('electron')

// import '../scss/styles.scss'
// import * as bootstrap from 'bootstrap'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // win.loadURL('https://github.com')
  win.loadFile('src/templates/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})