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
  
  win.loadFile('src/templates/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // console.log('READY')
  // const request = net.request('http://api.aladhan.com/v1/calendarByCity/2023/5?city=Jakarta&country=Indonesia&method=3')
  // request.on('response', (response) => {
  //   console.log(`STATUS: ${response.statusCode}`)
  //   response.on('data', (chunk) => {
  //     console.log(`BODY: ${chunk}`)
  //   })
  // })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})