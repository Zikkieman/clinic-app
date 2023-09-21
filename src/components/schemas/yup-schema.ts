import * as yup from "yup";

export const basicSchema = yup.object().shape({
  fullname: yup.string().required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(5)
    .required("Required"),
});
