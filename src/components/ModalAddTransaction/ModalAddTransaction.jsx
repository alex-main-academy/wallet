import css from './ModalAddTransaction.module.css';
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
import { formatDate } from 'helpers/formatDate';
import moment from 'moment';
import translation from 'assets/translation/add_transaction.json';
import { translationSelector } from 'redux/translation/translationSelectors';

const ModalAddTransaction = ({ onClose, onClickBackdrop }) => {
  const language = useSelector(translationSelector);
  const [valueDate, onChange] = useState(new Date());
  const [transactionDate, setTransactionDate] = useState(
    formatDate(moment(valueDate).format())
  );
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

      case 'transactionDate':
        setTransactionDate(value);
        break;

      case 'comment':
        setComment(value);
        break;

      case 'categoryId':
        setCategoryId(value);
        break;

      default:
        return;
    }
  };

  const handlerSubmit = e => {
    e.preventDefault();
    const correctAmmount = type === 'EXPENSE' ? Number('-' + amount) : amount;
    dispatch(
      addTransaction({
        transactionDate,
        type,
        categoryId,
        comment,
        amount: correctAmmount,
      })
    );

    setTransactionDate(new Date());
    setType('EXPENSE');
    setCategoryId('');
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
        <h2 className={css.modalTitle}>{translation[language].add}</h2>
        <form className={css.modalForm} onSubmit={handlerSubmit}>
          <div className={css.modalWrappenTransaction}>
            {isToggled ? (
              <p className={css.activeTransactionIncome}>
                {translation[language].income}
              </p>
            ) : (
              <p className={css.modalTransactionIncome}>
                {translation[language].income}
              </p>
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
              <p className={css.modalTransactionExpense}>
                {translation[language].expense}
              </p>
            ) : (
              <p className={css.activeTransactionExpense}>
                {translation[language].expense}
              </p>
            )}
          </div>
          {!isToggled && (
            <select
              className={css.modalSelect}
              name="categoryId"
              defaultValue="Select a category"
              onChange={handleNameChange}
            >
              <option disabled hidden>
                {translation[language].select}
              </option>
              {categories
                .filter(category => category.type === type)
                .map(category => (
                  <option
                    className={css.categoriesSelect}
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
            </select>
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
                dateFormat="YYYY.MM.DD"
                timeFormat={false}
                name="transactionDate"
                value={valueDate}
                onChange={onChange}
                onClose={value =>
                  setTransactionDate(formatDate(moment(value).format()))
                }
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
            placeholder={translation[language].comment}
          />
          <button className={css.btnAdd}>
            {translation[language].add_word}
          </button>
          <button className={css.btnCancel}>
            {translation[language].cancel}
          </button>
        </form>
      </div>
    </div>
  );
};
export default ModalAddTransaction;
