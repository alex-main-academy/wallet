import css from './ModalAddTransaction.module.css';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import calendar from './images/calendar.svg';
import modalCloseIcon from './images/close.svg';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { addTransaction} from 'redux/transactions/transactionsOperations';
import { fetchTransactionCategories } from 'redux/transactionCategories/transactionCategoriesOperations';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTransactionCategories } from 'redux/transactionCategories/transactionCategoriesSelectors';

const ModalAddTransaction = ({ onClose, onClickBackdrop }) => {
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const [type, setType] = useState('EXPENSE')
  const [categoryId, setCategoryId] = useState('');
  const [isToggled, setIsToggled] = useState(false);

 const dispatch = useDispatch();
 const categories = useSelector(selectTransactionCategories);
 console.log(categories)
//  const isLoading = useSelector(selectTransactionIsLoading)
//  console.log(isLoading)

  const onToggle = () => {
    setIsToggled(!isToggled)
  };

  const handleChangeType = () => {
    setType("INCOME");
  }

  useEffect(() => {
    dispatch(fetchTransactionCategories())
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

      case 'type':
        setType(value);
        break;

      case 'categoryId':
        setCategoryId(value);
        break;

      default:
        return;
    }
  };

  const handleChangeDate = () => {
    setTransactionDate('');
  };

  const handlerSubmit = e => {
    e.preventDefault();
    dispatch(addTransaction({transactionDate, type, categoryId, comment, amount }));
    setTransactionDate(new Date());
    setType("EXPENSE");
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
          <h2 className={css.modalTitle}>Add transaction</h2>
          <form className={css.modalForm} onSubmit={handlerSubmit}>
            <div className={css.modalWrappenTransaction}>
              {isToggled ? (
                <p className={css.activeTransactionIncome}>Income</p>
              ) : (
                <p className={css.modalTransactionIncome}>Income</p>
              )}
              <label className={css.toggleSwitch} >
                <input
                  type="checkbox"
                  value={type}
                  checked={isToggled}
                  onChange={onToggle}
                />
                <span className={css.switch} onClick={handleChangeType}/>
              </label>
              {isToggled ? (
                <p className={css.modalTransactionExpense}>Expense</p>
              ) : (
                <p className={css.activeTransactionExpense}>Expense</p>
              )}
            </div>
            {!isToggled && (
              <select
                className={css.modalSelect}
                defaultValue="Select a category"
              >
                <option disabled hidden>
                  Select a category
                </option>
                {categories.map(({id, name}) => (
              <option className={css.categoriesSelect} value={id} onChange={handleNameChange}>{name}</option>
            ))}
              </select>
            )}
            <div className={css.modalWrapper}>
              <input
                className={css.formInputSum}
                type="text"
                name="amount"
                value={amount}
                onChange={handleNameChange}
                placeholder="0.00"
              />
              <div className={css.inputDatetime}>
                <Datetime
                  dateFormat="MM.DD.YYYY"
                  timeFormat={false}
                  value={transactionDate}
                  onChange={handleChangeDate}
                />
                <img
                  className={css.calendarIcon}
                  src={calendar}
                  alt="calendar"
                />
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
            <button className={css.btnCancel}>Cancel</button>
          </form>
        </div>
      </div>
  );
};
export default ModalAddTransaction;
