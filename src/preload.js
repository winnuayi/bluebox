const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // renderer to main
  openSettings: () => ipcRenderer.send('open-settings'),
  setTitle: (title) => ipcRenderer.send('set-title', title),

  // renderer to main, main to renderer
  getPrayerTime: (day) => ipcRenderer.invoke('get-prayer-time', day),
  getPrayerTimeList: (params) => ipcRenderer.invoke('get-prayer-time-list', params),

  // main to renderer
  onCloseSettings: (callback) => ipcRenderer.on('close-settings', callback),
})

window.addEventListener('DOMContentLoaded', () => {

})