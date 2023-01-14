import css from './ModalAddTransaction.module.css';
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

const ModalAddTransaction = ({ onClose, onClickBackdrop }) => {
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const [type, setType] = useState('EXPENSE');
  const [categoryId, setCategoryId] = useState('');
  const [isToggled, setIsToggled] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector(selectTransactionCategories);

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
        setAmount(parseInt(value));
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

  const handlerSubmit = async e => {
    e.preventDefault();

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
    } catch (rejectedValueOrSerializedError) {
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
    setType('EXPENSE');
    setComment('');
    setAmount('');
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
        <form className={css.modalForm} onSubmit={handlerSubmit}>
          <div className={css.modalWrappenTransaction}>
            {isToggled ? (
              <p className={css.activeTransactionIncome}>Income</p>
            ) : (
              <p className={css.modalTransactionIncome}>Income</p>
            )}
            <label className={css.toggleSwitch}>
              <input
                type="checkbox"
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
              onChange={handleChangeCategories}
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
            <input
              className={css.formInputSum}
              type="number"
              name="amount"
              value={amount}
              onChange={handleNameChange}
              placeholder="0.00"
            />
            <div className={css.inputDatetime}>
              <Datetime
                dateFormat="MM.DD.YYYY"
                timeFormat={false}
                name="transactionDate"
                value={transactionDate}
                onChange={handleChangeDate}
              />
              <img className={css.calendarIcon} src={calendar} alt="calendar" />
            </div>
          </div>
          <input
            className={css.inputCommentText}
            type="text"
            name="comment"
            value={comment}
            onChange={handleNameChange}
            placeholder="Comment"
          />
          <button className={css.btnAdd}>Add </button>
          <button className={css.btnCancel} onClick={handleCancelTransaction}>
            Cancel
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
export default ModalAddTransaction;
