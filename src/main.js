const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('src/templates/index.html')

  return win
}

const createSettingsWindow = (mainWin) => {
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.on('closed', () => {
    mainWin.webContents.send('close-settings')
  })

  win.loadFile('src/templates/settings.html')
}

app.whenReady().then(() => {
  const mainWin = createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  
  // receiving event from renderer to main
  ipcMain.on('set-title', (event, title) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    win.setTitle(title)
  })

  ipcMain.on('open-settings', () => {
    createSettingsWindow(mainWin)
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})