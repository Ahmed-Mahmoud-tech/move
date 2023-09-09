const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');

// const path = require('path');

const path = require('node:path');
const { pdfToImages } = require('./lib/fileFunctions');
async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true,
      nodeIntegration: true,
      devTools: true,
    },
  });

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  createWindow();

  //! Events *******************************************************************************
  ipcMain.handle('ping', (event, props) => {
    return 'pong' + props;
  });
  ipcMain.handle(
    'createPresentation',
    async (event, { name, direction, file }) => {
      /// create new folder

      const presentationId = uuidv4();

      const destinationFolder = await path.join(
        __dirname,
        'presentationsDirectory',
        presentationId
      );

      await fs.mkdirSync(destinationFolder);

      /// copy file to public
      await fs.copy(
        file.filePath,
        `${destinationFolder}/${file.fileName}`,
        (err) => {
          if (err) {
            console.error('Error moving the file:', err);
          } else {
            console.log('File moved successfully');
          }
        }
      );

      await pdfToImages(
        `${destinationFolder}/${file.fileName}`,
        presentationId
      );
      /// set the presentation data to db

      const jsonData = await fs.readFileSync(
        `${path.join(__dirname)}/db.json`,
        'utf-8'
      );
      const data = JSON.parse(jsonData);

      newData = {
        name,
        direction,
        id: presentationId,
        directory: `${destinationFolder}/outputImages`,
      };

      data.presentations[presentationId] = newData;

      await fs.writeFileSync(
        `${path.join(__dirname)}/db.json`,
        JSON.stringify(data, null, 2)
      );

      // return await setTimeout(() => {
      return newData;
      // }, 3000);
    }
  );

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
