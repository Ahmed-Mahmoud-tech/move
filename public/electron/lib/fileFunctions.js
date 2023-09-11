// pdf to images
const pdfPoppler = require('pdf-poppler');
const path = require('path');
const fs = require('fs');

exports.pdfToImages = async (pdfFilePath, presentationId) => {
  // Define the input PDF file path
  // const pdfFilePath = 'input.pdf';

  // Define the output folder where images will be saved
  const outputFolder = path.join(
    __dirname,
    '../../presentationsDirectory',
    presentationId,
    'outputImages'
  );

  await fs.mkdirSync(outputFolder);
  const opts = {
    format: 'png', // Image format (you can also use 'jpg', 'jpeg', 'tiff', etc.)
    // out_dir: path.resolve(outputFolder),
    out_dir: outputFolder,
    out_prefix: 'page', // Prefix for the image files
  };

  pdfPoppler
    .convert(pdfFilePath, opts)
    .then((result) => {
      console.log('PDF converted to images:', result);
    })
    .catch((error) => {
      console.error('Error converting PDF to images:', error);
    });
};
