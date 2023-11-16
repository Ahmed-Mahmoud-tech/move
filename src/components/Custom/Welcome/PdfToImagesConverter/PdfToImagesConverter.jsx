/* eslint-disable indent */
import React from 'react';
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
    pages: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required('title is required'),
        num: Yup.number()
          .required('Page number is required')
          .positive()
          .integer(),
      })
    ),
  });

  const initialValues = {
    name: 'sss',
    direction: 'ltr',
    file: null,
    pages: [{ title: '', num: null }],
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const filePath = values.file.path;
      const fileName = values.file.name;

      const presentationId = uuidv4();
      const data = {
        name: values.name,
        direction: values.direction,
        file: { filePath, fileName },
        presentationId,
        pages: values.pages,
      };

      const jsonString = JSON.stringify(data);
      localStorage.setItem('currentPresentation', jsonString);
      navigate(`/display/${presentationId}`);
    },
  });

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
      <h1 className=' text-red-800'>useFormik and Yup Form</h1>
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
        {formik.values.pages.map((page, index) => (
          <div key={index}>
            <label htmlFor={`pages[${index}].title`}>title:</label>
            <input
              type="text"
              id={`pages[${index}].title`}
              name={`pages[${index}].title`}
              onChange={formik.handleChange}
              value={formik.values.pages[index].title}
            />
            {formik.touched.pages &&
            formik.errors.pages &&
            formik.errors.pages[index] ? (
              <div className="text-red-600">
                {formik.errors.pages[index].title}
              </div>
            ) : null}
            <label htmlFor={`pages[${index}].num`}>Page Number:</label>
            <input
              type="number"
              id={`pages[${index}].num`}
              name={`pages[${index}].num`}
              onChange={formik.handleChange}
              value={formik.values.pages[index].num}
            />
            {formik.touched.pages &&
              formik.errors.pages &&
              formik.errors.pages[index] && (
                <div className="text-red-600">
                  {formik.errors.pages[index].num}
                </div>
              )}
            <button
              type="button"
              onClick={() =>
                formik.setFieldValue(
                  'pages',
                  formik.values.pages.filter((_, i) => i !== index)
                )
              }
            >
              Remove Page
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            formik.setFieldValue('pages', [
              ...formik.values.pages,
              { title: '', num: 1 },
            ])
          }
        >
          Add Page
        </button>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
export default FileInputExample;
