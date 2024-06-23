import * as yup from "yup";

//signup validation
export const signupSchema = yup.object().shape({
  strName: yup
    .string()
    .required("please enter a name")
    .matches("^[a-zA-Z0-9 ]+$", "please enter a valid name"),
  strUserEmail: yup
    .string()
    .required("please enter a valid email")
    .email("invalid email address"),
  strPassWord: yup
    .string()
    .required("enter a password ")
    .min(6, "your password is weak")
    .max(20, "only 20 characters"),
  strConfirmPassword: yup
    .string()
    .oneOf([yup.ref("strPassWord"), null], `pasword doesn't match`),
});

//LOGIN validation

export const loginSchema = yup.object().shape({
  strUserEmail: yup
    .string()
    .email("please enter an valid email")
    .required("please enter an email"),

  strPassWord: yup
    .string()
    .min(6, "your pssword is week")
    .required("please enter your password")
    .max(20, "incorrect format"),
});

