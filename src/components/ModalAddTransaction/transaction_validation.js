import * as yup from 'yup';

export const transactionSchema = yup.object().shape({
  amount: yup.string().required(),
  transactionDate: yup.date().required("date is required field")
});
console.log(transactionSchema)
