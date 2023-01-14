import * as yup from 'yup';

export const transactionSchema = yup.object().shape({
  amount: yup.string(),
  categoryId: yup.string().required(),
  transactionDate: yup.date().default(function () {
    return new Date();
  }),
});
