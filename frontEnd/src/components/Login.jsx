import React from 'react';
import { useFormik } from 'formik';
import authService from '../services/authService';
import { loginSchema } from '../schemas';
import { useNavigate,Link } from 'react-router-dom';
import { Failed, Success } from '../helpers/popup';

const Login = () => {

  const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema:loginSchema ,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res=await authService.login(values);
        if(res.success){
          navigate('/dashboard')
          Success('welcome')
        }
      } catch (error) {
        console.log('Login failed:', error);
        Failed(error.response.data.message)
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

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
          {formik.isSubmitting?'submiting...':'Login'}
        </button>
        <div className="text-center mt-4">
          <span className="text-gray-700">Don't have an account? </span>
          <Link to="/" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
