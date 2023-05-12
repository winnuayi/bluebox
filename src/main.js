const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
const { AdhanProvider } = require('./utility/adhan-provider.js')


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('src/templates/index.html')
  
  win.webContents.openDevTools()

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

  ipcMain.on('update-data', () => {
    AdhanProvider.getData()
  })

  ipcMain.handle('get-prayer-time', async (_, day) => {
    const response = await fetch('http://localhost:9000/adhan.json')
    return response.json()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})