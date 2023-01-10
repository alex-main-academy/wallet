import css from './ModalAddTransaction.module.css';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import calendar from '../ModalAddTransaction/images/calendar.svg';
import { useState } from 'react';

const ModalAddTransaction = ({ addTransaction }) => {
  const [sum, setSum] = useState('');
  const [comment, setComment] = useState('');
  const [isToggled, setIsToggled] = useState(false);
  const onToggle = () => setIsToggled(!isToggled);


  const handleNameChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'sum':
        setSum(value);
        break;

      case 'comment':
        setComment(value);
        break;


      default:
        return;
    }
  };

  const handlerSubmit = e => {
    e.preventDefault();
    addTransaction({ sum, comment });
    setSum('');
    setComment('');

  };

  return (
    <div className={css.modal} onSubmit={handlerSubmit}>
      <h2 className={css.modalTitle}>Add transaction</h2>
      <form className={css.modalForm}>
      <div className={css.modalWrappenTransaction}>
      {isToggled ? (<p className={css.activeTransactionIncome}>Income</p>) : (<p className={css.modalTransactionIncome}>Income</p>)}
    <label className={css.toggleSwitch}>
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className={css.switch} />
    </label>
    {isToggled ? (<p className={css.modalTransactionExpense}>Expense</p>) : (<p className={css.activeTransactionExpense}>Expense</p>)}
    </div>
    {!isToggled &&
        <select className={css.modalSelect}>
          <option value="" disabled selected hidden>
            Select a category
          </option>
        </select>}
        <div className={css.modalWrapper}>
          <input
            className={css.formInputSum}
            type="text"
            name="sum"
            value={sum}
            onChange={handleNameChange}
            placeholder="0.00"
          />
          <div className={css.inputDatetime}>
            <Datetime dateFormat="DD.MM.YYYY" timeFormat={false} />
            <img className={css.calendarIcon} src={calendar} alt="" />
          </div>
        </div>
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={handleNameChange}
          placeholder="Comment"
        />
        <button className={css.btn}>Add </button>
        <button className={css.btn}>Cancel</button>
      </form>
    </div>
  );
};

export default ModalAddTransaction;
