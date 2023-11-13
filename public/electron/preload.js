const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ipcRenderer: () => process.versions.ipcRenderer,
  createPresentation: (e) => ipcRenderer.invoke('createPresentation', e),
  presentationConfig: (e) => ipcRenderer.invoke('presentationConfig', e),
  exportPresentation: (e) => ipcRenderer.invoke('exportPresentation', e),
  importPresentation: (e) => ipcRenderer.invoke('importPresentation', e),
  deletePresentation: (e) => ipcRenderer.invoke('deletePresentation', e),
});
