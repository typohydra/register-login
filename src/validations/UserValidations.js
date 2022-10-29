import * as yup from "yup";

export const userRegisterSchema = yup.object().shape({
  username: yup.string().required().min(4).max(30),
  email: yup.string().required().email(),
  password: yup.string().required().min(4).max(50),
  repeatPassword: yup.string().required().min(4).max(50),
});

export const userLoginSchema = yup.object().shape({
  username: yup.string().required().min(4).max(30),
  password: yup.string().required().min(4).max(50),
});
