import css from './ModalAddTransaction.module.css';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import { transactionSchema} from './transaction_validation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import Datetime from 'react-datetime';
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
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const [type, setType] = useState('EXPENSE');
  const [categoryId, setCategoryId] = useState('');
  const [isToggled, setIsToggled] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector(selectTransactionCategories);
  const initialValue ={
    type: 'EXPENSE',
    amount: '',
    categoryId: '',
    transactionDate: new Date(),
    comment: '',
  }

  const onToggle = () => {
    setIsToggled(!isToggled);
    if (isToggled) {
      setType('EXPENSE');
    } else {
      setType('INCOME');
      setCategoryId('063f1132-ba5d-42b4-951d-44011ca46262');
    }
  };

  useEffect(() => {
    dispatch(fetchTransactionCategories());
  }, [dispatch]);

  const handleNameChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'amount':
        setAmount(value);
        break;

      case 'comment':
        setComment(value);
        break;

      default:
        return;
    }
  };

  const handleChangeDate = event => {
    setTransactionDate(event);
  };

  const handleChangeCategories = event => {
    setCategoryId(event.value);
  };

  const handlerSubmit = async (event) => {
   event.preventDefault()

    const correctAmmount = type === 'EXPENSE' ? Number('-' + amount) : amount;

    try {
      await dispatch(
        addTransaction({
          transactionDate,
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
    setTransactionDate(new Date());
    setType('EXPENSE');
    setCategoryId('');
    setComment('');
    setAmount('');
  };

  const handleCancelTransaction = () => {
    setTransactionDate(new Date());
    setComment('');
    setAmount('');
    setCategoryId("")
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
        initialValues={initialValue}
      validator={() => ({})}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
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
              <input
                type="checkbox"
                name='type'
                value={type}
                checked={isToggled}
                onChange={onToggle}
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
            <Select
              className={css.modalSelect}
              placeholder={
                <div className={css.selectPlaceholderText}>
                  Select a category
                </div>
              }
              options={categories
                .filter(category => category.type === type)
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

              <Field name="transactionDate"  timeFormat={false} component={FormikDateTime}/>

              <img className={css.calendarIcon} src={calendar} alt="calendar" />
            </div>
          </div>
          <Field
            className={css.inputCommentText}
            type="text"
            name="comment"
            placeholder="Comment"
          />
          <button className={css.btnAdd} type="submit">Add</button>
        </Form>
         )}
        </Formik>

        <button className={css.btnCancel} onClick={handleCancelTransaction}>
        Cancel
          </button>
      </div>
      <ToastContainer />
    </div>
  );
};
export default ModalAddTransaction;
