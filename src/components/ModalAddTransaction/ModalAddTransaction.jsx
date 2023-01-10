import css from './ModalAddTransaction.module.css';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import calendar from '../../images/calendar.svg'

const ModalAddTransaction = () => {
  return (
<>

    <form className={css.form} >
      <h2 className={css.formTitle}>Add transaction</h2>
      <div className={css.wrappen}>
        <label htmlFor="" className={css.typeIncome}>
      Income
        <input
          className={css.formInput}
          type="radio"
          name="name"

        />
      </label>

      </div>
      <label htmlFor="" className={css.typeExpense}>
      Expense
        <input
          className={css.formInput}
          type="radio"
          name="name"

        />
      </label>
      <label htmlFor="" className={css.formLabel}>
        <input
          className={css.formInput}
          type="text"
          name="comment"
          placeholder="Select a category"
        />
      </label>
      <label htmlFor="" className={css.formLabel}>
        <input
          className={css.formInputSum}
          type="text"
          name="sum"
          placeholder="0.00"
        />
      </label>
      <label htmlFor="" className={css.labelDatetime}>
        <img className={css.calendar} src={calendar} alt=""/>
        <Datetime timeFormat={false}/>
      </label>
      <label htmlFor="" className={css.formLabel}>
        <input
          className={css.formInput}
          type="text"
          name="comment"
          placeholder="Comment"
        />
      </label>
      <button className={css.btn}>Add </button>
      <button className={css.btn}>Cancel</button>
    </form>
    </>
  );
};

export default ModalAddTransaction;
