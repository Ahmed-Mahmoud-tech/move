const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs-extra');
const pdfPoppler = require('pdf-poppler');

const path = require('node:path');
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
    async (event, { name, direction, file, presentationId, pages }) => {
      const destinationFolder = await path.join(
        __dirname,
        '../../ooo',
        presentationId
      );

      !fs.existsSync(destinationFolder) &&
        (await fs.mkdirSync(destinationFolder));
      await fs.copy(file.filePath, `${destinationFolder}/${file.fileName}`);

      //!********************************************

      const pdfToImages = async (pdfFilePath, presentationId) => {
        const outputFolder = path.join(
          __dirname,
          '../../ooo',
          presentationId,
          'outputImages'
        );

        !fs.existsSync(outputFolder) && (await fs.mkdirSync(outputFolder));
        const opts = {
          format: 'png',
          out_dir: outputFolder,
          out_prefix: 'page',
        };

        await pdfPoppler.convert(pdfFilePath, opts);

        await fs.copy(
          path.join(__dirname, '../../ooo', presentationId),
          path.join(__dirname, '../presentationsDirectory', presentationId)
        );

        return pdfPoppler.info(pdfFilePath).then((pdfInfo) => {
          return pdfInfo;
        });
      };

      const pdfInfo = await pdfToImages(
        `${destinationFolder}/${file.fileName}`,
        presentationId
      );

      //!********************************************

      const jsonData = await fs.readFileSync(
        `${path.join(__dirname)}/../db.json`,
        'utf-8'
      );

      const data = JSON.parse(jsonData);
      newData = {
        name,
        direction,
        id: presentationId,
        pagesCount: pdfInfo.pages,
        width: pdfInfo.width_in_pts,
        height: pdfInfo.height_in_pts,
        directory: `${destinationFolder}/outputImages`,
        pages,
      };
      data.presentations[presentationId] = newData;
      await fs.writeFileSync(
        `${path.join(__dirname)}/../db.json`,
        JSON.stringify(data, null, 2)
      );
    }
  );
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
