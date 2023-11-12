const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs-extra');
const pdfPoppler = require('pdf-poppler');
const archiver = require('archiver');
const opn = require('opn');

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
  ipcMain.handle('presentationConfig', async (event, config) => {
    const jsonData = await fs.readFileSync(
      `${path.join(__dirname)}/../db.json`,
      'utf-8'
    );

    const savedConfig = { ...config };
    delete savedConfig.presentationId;

    const data = JSON.parse(jsonData);

    data.presentations[config.presentationId].config = savedConfig;

    await fs.writeFileSync(
      `${path.join(__dirname)}/../db.json`,
      JSON.stringify(data, null, 2)
    );
  });

  ipcMain.handle(
    'createPresentation',
    async (event, { name, direction, file, presentationId, pages }) => {
      const destinationFolder = await path.join(
        __dirname,
        '../../preparationFolder',
        presentationId
      );
      console.log('11111111111111111111');
      await fs.mkdirSync(await path.join(__dirname, '../../preparationFolder'));

      !fs.existsSync(destinationFolder) &&
        (await fs.mkdirSync(destinationFolder));
      await fs.copy(file.filePath, `${destinationFolder}/${file.fileName}`);

      //!********************************************
      console.log('22222222222222');

      const pdfToImages = async (pdfFilePath, presentationId) => {
        const outputFolder = path.join(
          __dirname,
          '../../preparationFolder',
          presentationId,
          'outputImages'
        );
        console.log('333333333333333333');

        !fs.existsSync(outputFolder) && (await fs.mkdirSync(outputFolder));
        const opts = {
          format: 'png',
          out_dir: outputFolder,
          out_prefix: 'page',
        };

        await pdfPoppler.convert(pdfFilePath, opts);
        console.log('4444444444444444444444');

        await fs.copy(
          path.join(__dirname, '../../preparationFolder', presentationId),
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
      const newData = {
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

      fs.rmdirSync(await path.join(__dirname, '../../preparationFolder'), {
        recursive: true,
      });

      await fs.writeFileSync(
        `${path.join(__dirname)}/../db.json`,
        JSON.stringify(data, null, 2)
      );
    }
  );

  async function compressFolder(folderPath, outputDirectory = null) {
    return new Promise((resolve, reject) => {
      // Determine the output directory
      const defaultOutputDirectory =
        outputDirectory || path.dirname(folderPath);

      // Create a write stream to the output zip file
      const outputZipPath = path.join(
        defaultOutputDirectory,
        `${path.basename(folderPath)}.zip`
      );
      const outputZipStream = fs.createWriteStream(outputZipPath);

      // Create a new archiver instance
      const archive = archiver('zip', { zlib: { level: 9 } }); // Use zlib level 9 for maximum compression

      // Pipe the archive data to the output stream
      archive.pipe(outputZipStream);

      // Append all files from the folder to the archive
      archive.directory(folderPath, false);

      // Listen for the 'close' event to know when the archive is finished
      outputZipStream.on('close', () => {
        console.log(`Archive created: ${outputZipPath}`);
        resolve(outputZipPath);
      });

      // Handle archive errors
      archive.on('error', (error) => {
        console.error('Error creating archive:', error);
        reject(error);
      });

      // Listen for the 'end' event to know when the archive is done
      archive.on('end', () => {
        // This event is emitted when the data has been fully consumed
        // Ensure that the 'close' event has occurred before resolving
        // This is important for very fast archiving processes
        resolve(outputZipPath);
      });

      // Finalize the archive
      archive.finalize();
    });
  }

  ipcMain.handle('exportPresentation', async (event, id) => {
    const folderPath = path.join(__dirname, `../../${id}`);
    const outputDirectory = path.join(__dirname, '../..');

    await fs.copy(
      path.join(__dirname, `../presentationsDirectory/${id}`),
      path.join(__dirname, '../..', `${id}`)
    );

    const jsonData = await fs.readFileSync(
      `${path.join(__dirname)}/../db.json`,
      'utf-8'
    );

    const data = JSON.parse(jsonData);

    await fs.writeFileSync(
      path.join(__dirname, `../../${id}/config.json`),
      JSON.stringify({ [id]: data.presentations[id] }),
      'utf-8'
    );

    compressFolder(folderPath)
      .then(() => {
        fs.copy(
          path.join(__dirname, '../..', `${id}.zip`),
          path.join(__dirname, '..', `${id}.zip`)
        );
      })

      .then(() => {
        opn(path.join('http://localhost:3000/', `${id}.zip`));
      })
      .then(() => {
        setTimeout(() => {
          fs.rm(path.join(__dirname, '../..', `${id}`), {
            recursive: true,
          });
          fs.rm(path.join(__dirname, '../..', `${id}.zip`), {
            recursive: true,
          });
          fs.rm(path.join(__dirname, '..', `${id}.zip`), { recursive: true });
        }, 10000);
      })
      .catch((error) => {
        console.error('Error compressing folder:', error);
      });
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
