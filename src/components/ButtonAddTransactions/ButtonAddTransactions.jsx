import css from './ButtonAddTransactions.module.css';
import btnAddTransactions from '../ButtonAddTransactions/image/btnAddTransactions.svg';

const ButtonAddTransactions = () => {

  return (
    <button className={css.btnAdd} >
      <img className={css.btnIcon} src={btnAddTransactions} alt="calendar"/>
    </button>
  );
};

export default ButtonAddTransactions;
