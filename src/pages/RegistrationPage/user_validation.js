import * as yup from 'yup';

export const userSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(12).required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passwords must match'),
  name: yup.string().min(1).max(12).required(),
});
