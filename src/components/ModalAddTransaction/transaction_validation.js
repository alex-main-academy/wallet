import * as yup from 'yup';

export const transactionSchema = yup.object().shape({
  amount: yup.string().required(),
});
console.log(transactionSchema)
