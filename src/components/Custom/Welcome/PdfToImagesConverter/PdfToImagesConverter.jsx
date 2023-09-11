/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
const { v4: uuidv4 } = require('uuid');

function FileInputExample() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    direction: Yup.string().required('Language direction is required'),
    file: Yup.mixed().required('File is required'),
  });

  const initialValues = {
    name: 'sss',
    direction: 'ltr',
    file: null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission here, e.g., send data to a server.

      const filePath = values.file.path;
      const fileName = values.file.name;

      const presentationId = uuidv4();
      const data = {
        name: values.name,
        direction: values.direction,
        file: { filePath, fileName },
        presentationId,
      };

      const jsonString = JSON.stringify(data);
      localStorage.setItem('currentPresentation', jsonString);
      navigate(`/display/${presentationId}`);
      // const response = await window.versions.createPresentation(data);
      // }
    },
  });

  // useEffect(() => {
  //   console.log({ data });
  // }, [data]);

  const FileInput = ({ field, form }) => {
    return (
      <input
        type="file"
        onChange={(event) => {
          form.setFieldValue(field.name, event.currentTarget.files[0]);
        }}
      />
    );
  };

  return (
    <div>
      <h1>useFormik and Yup Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name && (
            <div>{formik.errors.name}</div>
          )}
        </div>

        <div>
          <label htmlFor="direction">Language Direction:</label>
          <select
            id="direction"
            name="direction"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.direction}
          >
            <option value="ltr">Left to Right (LTR)</option>
            <option value="rtl">Right to Left (RTL)</option>
          </select>
          {formik.touched.direction && formik.errors.direction && (
            <div>{formik.errors.direction}</div>
          )}
        </div>

        <div>
          <label htmlFor="file">File Upload:</label>
          <FileInput field={{ name: 'file' }} form={formik} />
          {formik.touched.file && formik.errors.file && (
            <div>{formik.errors.file}</div>
          )}
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
export default FileInputExample;
