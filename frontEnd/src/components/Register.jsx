import React from 'react';
import { useFormik } from 'formik';
import authService from '../services/authService';
import { registrationSchema } from '../schemas';
import { useNavigate,Link } from 'react-router-dom';
import { Failed, Success } from '../helpers/popup';

const Register = () => {

  const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      phone: '',
      password: '',
    },
    validationSchema:registrationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const res=await authService.register(values);
        if(res.success){
          navigate('/dashboard')
          Success('welcome')
        }
        resetForm();
      } catch (error) {
        console.log('Registration failed:', error);
        Failed(error.response.data.message)
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            className={`w-full p-3 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Phone</label>
          <input
            type="text"
            name="phone"
            className={`w-full p-3 border ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
          ) : null}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            className={`w-full p-3 border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting?'submitting..':'Register'}
        </button>
        <div className="text-center mt-4">
          <span className="text-gray-700">Already have an account? </span>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
