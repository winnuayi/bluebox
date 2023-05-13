// keyword import is not allowed here, use require

const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
const { AdhanProvider } = require('./utility/adhan-provider.js')


const createWindow = () => {
  // instantiate main window
  const win = new BrowserWindow({
    width: 800,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // render main view
  win.loadFile('src/templates/index.html')
  
  // open developer tools
  win.webContents.openDevTools()

  return win
}

const createSettingsWindow = (mainWin) => {
  // instantiate settings window
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // when settings window closed, tell main windows (to render new information)
  win.on('closed', () => {
    mainWin.webContents.send('close-settings')
  })

  // render settings view
  win.loadFile('src/templates/settings.html')
}

app.whenReady().then(() => {
  // at the very first time, create main windows
  const mainWin = createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  
  // receive event from renderer via 'set-title' channel (one way)
  ipcMain.on('set-title', (event, title) => {
    // get the window instance from sender and set title from main process
    const win = BrowserWindow.fromWebContents(event.sender)
    win.setTitle(title)
  })

  // receive event from renderer via 'open-settings' channel (one way)
  // to open settings window
  ipcMain.on('open-settings', () => {
    createSettingsWindow(mainWin)
  })

  ipcMain.on('update-data', () => {
    AdhanProvider.getPrayerTimes()
  })

  // receive event from renderer via 'get-prayer-time' channel
  // and send response back to renderer (two way)
  ipcMain.handle('get-prayer-time', async (_, day) => {
    const response = await AdhanProvider.getPrayerTime(day)
    return response
  })
})

// quit application. bye!
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})