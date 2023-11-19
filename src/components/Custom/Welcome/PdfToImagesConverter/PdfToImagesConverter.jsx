/* eslint-disable indent */
import React from 'react';
import { Field, useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
const { v4: uuidv4 } = require('uuid');
import Button from '../../../Shard/Button/Button';
import FileUpload from '../../../Shard/FileUpload/FileUpload';
import TextInput from '../../../Shared/TextInput/TextInput';
import { MdClose } from 'react-icons/md';
function FileInputExample() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    direction: Yup.string().required('Language direction is required'),
    file: Yup.mixed()
      .required('File is required')
      .test(
        'fileType',
        'Only PDF files are allowed',
        (value) => value && value.type.includes('pdf')
      )
      .test(
        'fileSize',
        'File size must be less than 5MB',
        (value) => value && value.size <= 5 * 1024 * 1024
      ),
    pages: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required('title is required'),
        num: Yup.string()
          .required('Page number is required')
          .test(
            'Number',
            'Must be a valid Number',
            (value) => value && value > 0 && value % 1 == 0
          ),
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

  return (
    <div className="w-[48%] min-w-[340px] m-auto">
      <h1 className="text-2xl font-semibold">Create New Presentation</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="py-2">
          <TextInput formik={formik} name="name" placeholder="Name" />
        </div>

        <div className="py-2">
          <select
            className="bg-blackColor border border-whiteColor text-whiteColor text-sm rounded-lg block w-full p-2.5"
            id="direction"
            name="direction"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.direction}
          >
            <option selected disabled>
              Choose the book direction
            </option>
            <option value="ltr">Left to Right (LTR)</option>
            <option value="rtl">Right to Left (RTL)</option>
          </select>

          {formik.touched.direction && formik.errors.direction && (
            <div>{formik.errors.direction}</div>
          )}
        </div>
        <div className="py-2">
          <FileUpload
            text="Upload pdf book"
            name="Drag and drop pdf book or click to select one"
            change={(event) => {
              formik.setFieldValue('file', event.currentTarget.files[0]);
            }}
            formik={formik}
          />
        </div>

        <div className="p-4 border rounded-md my-2 ">
          <div className="title text-xl flex justify-between items-center">
            <h2 className="title text-thirdColor">Create the Book Index</h2>
            <Button
              className="bg-thirdColor py-1 px-3 text-lg rounded"
              text={'Add New'}
              action={() =>
                formik.setFieldValue('pages', [
                  ...formik.values.pages,
                  { title: '', num: 1 },
                ])
              }
            />
          </div>
          {formik.values.pages.map((page, index) => (
            <div
              key={index}
              className={`flex items-start ${index == 0 && 'mt-6'}`}
            >
              <div className="inputWrapper pb-2 pr-2 basis-full mb-4">
                <TextInput
                  formik={formik}
                  name={`pages[${index}].title`}
                  placeholder="Page Title"
                />
                {formik.touched.pages &&
                  formik.errors.pages &&
                  formik.errors.pages[index] && (
                    <div className="text-error text-sm absolute">
                      {formik.errors.pages[index].title}
                    </div>
                  )}
              </div>
              <div className="inputWrapper pb-2 pr-2  basis-full mb-4">
                <TextInput
                  formik={formik}
                  name={`pages[${index}].num`}
                  placeholder="Page Number"
                />
                {formik.touched.pages &&
                  formik.errors.pages &&
                  formik.errors.pages[index] && (
                    <div className="text-error text-sm  absolute">
                      {formik.errors.pages[index].num}
                    </div>
                  )}
              </div>
              <Button
                text={<MdClose />}
                className={'bg-error p-2 rounded text-2xl'}
                action={() =>
                  formik.setFieldValue(
                    'pages',
                    formik.values.pages.filter((_, i) => i !== index)
                  )
                }
              />
            </div>
          ))}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-mainColor text-xl rounded-md p-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default FileInputExample;
