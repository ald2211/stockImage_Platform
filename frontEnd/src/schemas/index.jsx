import * as Yup from "yup";

export const registrationSchema=Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
      password: Yup.string()
      .required("password is required")
      .min(8, "password must be at leaset 8 characters")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "atleast one symbol required")
      .matches(/[0-9]/, "atleast one number required")
      .matches(/[A-Z]/, "atleast one uppercase letter required")
      .matches(/[a-z]/, "atleast one lowercase letter required")
  })

  export const loginSchema=Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .required("password is required")
      .min(8, "password must be at leaset 8 characters")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "atleast one symbol required")
      .matches(/[0-9]/, "atleast one number required")
      .matches(/[A-Z]/, "atleast one uppercase letter required")
      .matches(/[a-z]/, "atleast one lowercase letter required")
  })

  export const resetPasswordSchema=Yup.object({
    currentPassword: Yup.string()
    .required("password is required")
    .min(8, "password must be at leaset 8 characters")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "atleast one symbol required")
    .matches(/[0-9]/, "atleast one number required")
    .matches(/[A-Z]/, "atleast one uppercase letter required")
    .matches(/[a-z]/, "atleast one lowercase letter required"),
    newPassword: Yup.string()
      .required('New Password is required')
      .min(8, 'New Password must be at least 8 characters long')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "atleast one symbol required")
      .matches(/[0-9]/, "atleast one number required")
      .matches(/[A-Z]/, "atleast one uppercase letter required")
      .matches(/[a-z]/, "atleast one lowercase letter required")
      .notOneOf([Yup.ref('currentPassword'), null], 'New Password must be different from the current password'),
  })