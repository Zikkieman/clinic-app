import * as yup from "yup";

export const basicSchema = yup.object().shape({
  fullname: yup.string().required("Required!"),
  email: yup.string().email("Please enter a valid email").required("Required!"),
  password: yup.string().min(5).required("Required!"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required!"),
  password: yup.string().min(5).required("Required!"),
});

export const changeSchema = yup.object().shape({
  newEmail: yup
    .string()
    .email("Please enter a valid email")
    .required("Required!"),
  password: yup.string().min(5).required("Required!"),
});

export const forgotSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required!"),
  password: yup.string().min(5).required("Required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("Required"),
});
