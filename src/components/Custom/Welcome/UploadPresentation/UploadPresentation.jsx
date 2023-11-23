import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '../../../Shard/Button/Button';
import FileUpload from '../../../Shard/FileUpload/FileUpload';

function UploadPresentation() {
  const validationSchema = Yup.object().shape({
    zipFile: Yup.mixed()
      .required('File is required')
      .test('fileType', 'Only ZIP files are allowed', (value) => {
        return value && value.type.includes('zip');
      })
      .test(
        'fileSize',
        'File size must be less than 5MB',
        (value) => value && value.size <= 5 * 1024 * 1024
      ),
  });

  const initialValues = {
    zipFile: null,
  };

  const uploadPre = async (name, path) => {
    await window.versions.importPresentation({
      fileName: name,
      filePath: path,
    });
  };

  const uploadFormik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const filePath = values.zipFile.path;
      const fileName = values.zipFile.name;
      console.log('888888888888888');
      uploadPre(fileName, filePath);
      // const filePath = values.file.path;
      // const fileName = values.file.name;
      // const presentationId = uuidv4();
      // const data = {
      //   name: values.name,
      //   direction: values.direction,
      //   file: { filePath, fileName },
      //   presentationId,
      //   pages: values.pages,
      // };
      // const jsonString = JSON.stringify(data);
      // localStorage.setItem('currentPresentation', jsonString);
      // navigate(`/display/${presentationId}`);
    },
  });

  return (
    <form onSubmit={uploadFormik.handleSubmit} className="flex">
      <div className=" flex-grow">
        <FileUpload
          text="Upload the exported book"
          name="zipFile"
          // name="Drag and drop exported book or click to select one"
          className={'h-[5rem]'}
          change={(event) => {
            uploadFormik.setFieldValue('zipFile', event.currentTarget.files[0]);
          }}
          formik={uploadFormik}
        />
      </div>
      {/* <input type="file" name="file" id="" onChange={(e) => uploadPre(e)} /> */}
      {/* <FileUpload
          text="Upload the exported book"
          name="Drag and drop exported book or click to select one"
          change={(e) => uploadPre(e)}
        /> */}
      <button
        type="submit"
        className=" bg-mainColor text-xl rounded-md p-4 ml-2 "
      >
        Submit
      </button>
    </form>
  );
}
export default UploadPresentation;
