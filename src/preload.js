const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // renderer to main
  openSettings: () => ipcRenderer.send('open-settings'),
  setTitle: (title) => ipcRenderer.send('set-title', title),

  // main to renderer
  onCloseSettings: (callback) => ipcRenderer.on('close-settings', callback),
})

window.addEventListener('DOMContentLoaded', () => {

})