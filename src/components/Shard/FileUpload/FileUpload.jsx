import React, { useState } from 'react';

const FileUpload = ({ text, name, change, formik, className }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileText, setFileText] = useState(text);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    handleFiles(files);
    formik.setFieldValue(name, files[0]);
    setFileText(files[0]?.name);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    handleFiles(files);
    change(e);
    setFileText(files[0]?.name);
  };

  const handleFiles = (files) => {
    for (const file of files) {
      console.log('File selected:', file.name);
      // Perform any file-related actions here
    }
  };

  return (
    <label
      htmlFor={name}
      className={`text-secondColor   w-full h-40 border-2 border-dashed rounded-md text-center flex items-center justify-center cursor-pointer ${
        isDragOver ? 'bg-blue-100 border-blue-500' : ''
      } ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <span>{isDragOver ? 'Drop the file here' : fileText}</span>
      <input
        type="file"
        name={name}
        id={name}
        className="hidden"
        onChange={handleFileChange}
      />
      <div>
        {formik.touched.file && formik.errors.file && (
          <div className="p-2 text-error text-sm">{formik.errors.file}</div>
        )}
      </div>
    </label>
  );
};

export default FileUpload;
