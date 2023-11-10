const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const pdfPoppler = require('pdf-poppler');

const path = require('path');
const fs = require('fs-extra');

// Use body-parser middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const port = 8000;
app.use(cors());

// Log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, this is your Node.js backend!');
});

app.get('/createpresentation', (req, res) => {
  res.send('Hello, this is your Node.js backend for presentations!');
});
app.post('/createpresentation', async (req, res) => {
  // console.log(req.body, '5555566666666666');

  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve('00');
  //   }, 2000);
  // });

  const { name, direction, file, presentationId, pages } = req.body;

  /// create new folder
  const destinationFolder = await path.join(
    __dirname,
    '../presentationsDirectory',
    presentationId
  );
  console.log({ destinationFolder });
  console.log('**************************10');
  !fs.existsSync(destinationFolder) && (await fs.mkdirSync(destinationFolder));
  console.log('**************************1');
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
  console.log('**************************2');
  //!********************************************

  const pdfToImages = async (pdfFilePath, presentationId) => {
    // Define the input PDF file path
    // const pdfFilePath = 'input.pdf';
    console.log(__dirname, '***************----------*');

    // Define the output folder where images will be saved
    const outputFolder = path.join(
      __dirname,
      '../presentationsDirectory',
      presentationId,
      'outputImages'
    );
    console.log('**************************4');

    !fs.existsSync(destinationFolder) && (await fs.mkdirSync(outputFolder));
    const opts = {
      format: 'png', // Image format (you can also use 'jpg', 'jpeg', 'tiff', etc.)
      // out_dir: path.resolve(outputFolder),
      out_dir: outputFolder,
      out_prefix: 'page', // Prefix for the image files
    };
    console.log('**************************5');

    // try {
    //   const result = await pdfPoppler.convert(pdfFilePath, opts);
    //   console.log('Conversion Successful:', result);
    // } catch (error) {
    //   console.error('Conversion Failed:', error);
    // }

    await new Promise((resolve) => {
      setTimeout(() => {
        fs.writeFileSync(outputFolder + '/1.text', 'ddddddddddd1', 'utf-8');
      }, 1000);
      setTimeout(() => {
        fs.writeFileSync(outputFolder + '/2.text', 'ddddddddddd2', 'utf-8');
      }, 2000);
      setTimeout(() => {
        fs.writeFileSync(outputFolder + '/3.text', 'ddddddddddd3', 'utf-8');
      }, 3000);
      setTimeout(() => {
        fs.writeFileSync(outputFolder + '/4.text', 'ddddddddddd4', 'utf-8');
      }, 4000);
      setTimeout(() => {
        fs.writeFileSync(outputFolder + '/5.text', 'ddddddddddd5', 'utf-8');
      }, 5000);
      setTimeout(() => {
        resolve('555555555555555');
      }, 60000);
    });

    console.log('**************************5');
    return pdfPoppler.info(pdfFilePath).then((pdfInfo) => {
      console.log(pdfInfo, '0000000');
      return pdfInfo;
    });
  };

  const pdfInfo = await pdfToImages(
    `${destinationFolder}/${file.fileName}`,
    presentationId
  );

  //!********************************************

  /// set the presentation data to db
  const jsonData = await fs.readFileSync(
    `${path.join(__dirname)}/../db.json`,
    'utf-8'
  );

  const data = JSON.parse(jsonData);
  newData = {
    name,
    direction,
    id: presentationId,
    // pagesCount: pdfInfo.pages,
    // width: pdfInfo.width_in_pts,
    // height: pdfInfo.height_in_pts,
    directory: `${destinationFolder}/outputImages`,
    pages,
  };
  data.presentations[presentationId] = newData;
  await fs.writeFileSync(
    `${path.join(__dirname)}/../db.json`,
    JSON.stringify(data, null, 2)
  );
  // // event.sender.send('action-from-main', 'Action data from main process');
  const result = await new Promise((resolve) => {
    // setTimeout(() => {
    resolve(newData);
    // }, 2000);
  });

  console.log('haaaaaaaaaaaaaaaaaaaaamaaaaaaaaaaaaaaadaaaaaaaaaaaa');
  res.send(result);
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
// const express = require('express');
// const app = express();
// const port = 5000;

// app.get('/', (req, res) => {
//   res.send('Hello, this is your Node.js backend!');
// });

// app.listen(port, () => {
//   console.log(`Server is listening at http://localhost:${port}`);
// });
