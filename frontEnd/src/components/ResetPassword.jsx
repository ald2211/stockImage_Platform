import React from 'react';
import { useFormik } from 'formik';
import { resetPasswordSchema } from '../schemas';
import userService from '../services/userService';
import { Failed, Success } from '../helpers/popup';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit:async (values) => {
      try{
        const res=await userService.resetUserPassword(values)
        if(res.success) Success('Password Changed Successfully'); navigate('/dashboard')
      }catch(err){
        Failed(err.response.data.message)
    }
    },
  });

  return (
    <div className="max-w-md mx-auto  p-6 bg-white rounded-lg shadow-md relative top-36">
      <h2 className="text-2xl font-semibold mb-6 text-center">Reset Password</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="currentPassword"
            className="block text-gray-700 font-medium mb-2"
          >
            Current Password
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            className={`w-full p-2 border rounded-md ${
              formik.touched.currentPassword && formik.errors.currentPassword
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.currentPassword}
          />
          {formik.touched.currentPassword && formik.errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.currentPassword}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-gray-700 font-medium mb-2"
          >
            New Password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            className={`w-full p-2 border rounded-md ${
              formik.touched.newPassword && formik.errors.newPassword
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
