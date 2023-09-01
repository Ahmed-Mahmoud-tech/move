import React, { useState } from 'react';
// import { ipcRenderer } from 'electron';
function FileInputExample() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // const handleUpload = () => {
  //   if (file) {
  //     ipcRenderer.send('upload-request', file);
  //   }
  // };

  return (
    <div className="App">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Convert</button>
    </div>
  );
}

export default FileInputExample;
