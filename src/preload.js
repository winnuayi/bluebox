const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // renderer to main
  openSettings: () => ipcRenderer.send('open-settings'),
  setTitle: (title) => ipcRenderer.send('set-title', title),
  updateData: () => ipcRenderer.send('update-data'),

  // renderer to main, main to renderer
  getPrayerTime: (day) => ipcRenderer.invoke('get-prayer-time', day),
  
  // main to renderer
  onCloseSettings: (callback) => ipcRenderer.on('close-settings', callback),
})

window.addEventListener('DOMContentLoaded', () => {

})