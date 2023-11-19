/* eslint-disable indent */
import React from 'react';

export default function TextInput({ formik, name, placeholder }) {
  return (
    <div>
      <input
        type="text"
        id={name}
        placeholder={placeholder}
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        className="bg-blackColor border border-whiteColor text-whiteColor text-sm rounded-lg  block w-full p-2.5"
      />
      {/* {!error
        ? */}
      {formik.errors[name] && formik.touched[name] && (
        <div className="text-error">{formik.errors[name]}</div>
      )}
      {/* // : error} */}
    </div>
  );
}
