import css from './ModalAddTransaction.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { transactionSchema } from './transaction_validation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import 'react-datetime/css/react-datetime.css';
import calendar from './images/calendar.svg';
import modalCloseIcon from './images/close.svg';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from 'redux/transactions/transactionsOperations';
import { fetchTransactionCategories } from 'redux/transactions/transactionsOperations';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTransactionCategories } from 'redux/transactions/transactionsSelectors';
import { refreshUser } from 'redux/auth/authOperations';
import FormikDateTime from './FormicDatetime';

const ModalAddTransaction = ({ onClose, onClickBackdrop }) => {

  const [type, setType] = useState('EXPENSE');
  const [categoryId, setCategoryId] = useState('');
  const [isToggled, setIsToggled] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector(selectTransactionCategories);

  const onToggle = (setFieldValue, resetForm, values) => {
    setIsToggled(!isToggled);
    console.log(values.target.checked);
    if (values.target.checked) {
      setType(type);
    } else {
      setType('INCOME');
      setCategoryId(categoryId);
    }

    resetForm();
    return setFieldValue('type', values.target.checked ? 'INCOME' : 'EXPENSE');
  };

  useEffect(() => {
    dispatch(fetchTransactionCategories());
  }, [dispatch]);

  const handlerSubmit = async ({
    transactionDate,
    type,
    categoryId,
    comment,
    amount,
  }, resetForm) => {


    const correctAmmount = type === 'EXPENSE' ? Number('-' + amount) : amount;

    try {
      await dispatch(
        addTransaction({
          transactionDate: new Date(transactionDate),
          type,
          categoryId,
          comment,
          amount: correctAmmount,
        })
      ).unwrap();
      onClose();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }

    dispatch(refreshUser());
    resetForm();

  };


  const handleCancel = (e) => {

    console.log(handleCancel)
};

  return (
    <div className={css.overlay} onClick={onClickBackdrop}>
      <div className={css.modal}>
        <button type="button" className={css.modalCloseBtn} onClick={onClose}>
          <img
            className={css.modalCloseIcon}
            src={modalCloseIcon}
            alt="close"
          />
        </button>
        <h2 className={css.modalTitle}>Add transaction</h2>
        <Formik
          initialValues={{
            type: 'EXPENSE',
            amount: '',
            categoryId: '063f1132-ba5d-42b4-951d-44011ca46262',
            transactionDate: new Date(),
            comment: '',
          }}
          validationSchema={transactionSchema}
          onSubmit={(values) => {
            handlerSubmit(values);
          }}
        >
          {formik => (
            <Form>
              <div className={css.modalWrappenTransaction}>
                {isToggled ? (
                  <p className={css.activeTransactionIncome}>Income</p>
                ) : (
                  <p className={css.modalTransactionIncome}>Income</p>
                )}
                <label className={css.toggleSwitch}>
                  <Field
                    type="checkbox"
                    name="type"
                    checked={isToggled}
                    onChange={values =>
                      onToggle(formik.setFieldValue, formik.resetForm, values)
                    }
                  />
                  <span className={css.switch} />
                </label>
                {isToggled ? (
                  <p className={css.modalTransactionExpense}>Expense</p>
                ) : (
                  <p className={css.activeTransactionExpense}>Expense</p>
                )}
              </div>
              {!isToggled && (
                <Field name="categoryId">
                  {({ field, form }) => (
                    <Select
                      onChange={selectedOption =>
                        form.setFieldValue('categoryId', selectedOption.value)
                      }
                      className={css.modalSelect}
                      placeholder={
                        <div className={css.selectPlaceholderText}>
                          Select a category
                        </div>
                      }
                      options={categories
                        .filter(category => category.type === form.values.type)
                        .map(category => ({
                          value: category.id,
                          label: category.name,
                        }))}
                      theme={theme => ({
                        ...theme,
                        borderRadius: '20px',
                        background: 'rgba(255, 255, 255, 0.7)',
                        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
                        colors: {
                          ...theme.colors,
                          text: '#FF6596',
                          primary25: 'white',
                          primary: '#FF6596',
                        },
                      })}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          border: 'none',
                          borderBottom: ' 1px solid #e0e0e0',
                          outline: 'none',
                        }),
                      }}
                    />
                  )}
                </Field>
              )}
              <ErrorMessage
                name="categoryId"
                component="div"
                className={css.invalidFeedback}
              />
              <div className={css.modalWrapper}>
                <Field
                  className={css.formInputSum}
                  type="number"
                  name="amount"
                  placeholder="0.00"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className={css.invalidFeedback}
                />
                <div className={css.inputDatetime}>
                  <Field
                    name="transactionDate"
                    timeFormat={false}
                    component={FormikDateTime}
                  />
                  <ErrorMessage
                    name="transactionDate"
                    component="div"
                    className={css.invalidFeedback}
                  />
                  <img
                    className={css.calendarIcon}
                    src={calendar}
                    alt="calendar"
                  />
                </div>
              </div>
              <Field
                className={css.inputCommentText}
                type="text"
                name="comment"
                placeholder="Comment"
              />
              <button className={css.btnAdd} type="submit">
                Add
              </button>
            </Form>
          )}
        </Formik>

        <button className={css.btnCancel} onClick={handleCancel}>Cancel</button>
      </div>
      <ToastContainer />
    </div>
  );
};
export default ModalAddTransaction;
