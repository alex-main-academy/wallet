import css from './ModalAddTransaction.module.css';

const ModalAddTransaction = () => {
  return (
    <form className={css.form} >
      <h2 className={css.formTitle}>Add transaction</h2>
      <label htmlFor="" className={css.typeIncome}>
      Income
        <input
          className={css.formInput}
          type="radio"
          name="name"

        />
      </label>
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
          className={css.formInput}
          type="text"
          name="comment"
          placeholder="Comment"
        />
      </label>
      <button className={css.btn}>Add </button>
      <button className={css.btn}>Cancel</button>
    </form>
  );
};

export default ModalAddTransaction;
