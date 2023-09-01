const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      devTools: true,
      // preload: path.join(__dirname, 'preload.js')
    },
  });

  // win.loadFile('index.html');
  // const indexPath = isDev
  //   ? 'http://localhost:3000'
  //   : `file://${path.join(__dirname, '../build/index.html')}`;

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const mainMenuTemplate = [
  {
    label: 'File00',
  },
];

// const { app, BrowserWindow } = require('electron');

// const path = require('path');
// const isDev = require('electron-is-dev');

// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       // nodeIntegration: true, // Required for using Node.js in the renderer process

//     },
//   });

//   const indexPath = isDev
//     ? 'http://localhost:3000'
//     : `file://${path.join(__dirname, '../build/index.html')}`;

//   mainWindow.loadURL(indexPath);

//   mainWindow.on('closed', () => {
//     mainWindow = null;
//   });
// }

// app.on('ready', createWindow);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (mainWindow === null) {
//     createWindow();
//   }
// });
