import css from './ButtonAddTransactions.module.css';
import btnAddTransactions from '../ButtonAddTransactions/image/btnAddTransactions.svg';

const ButtonAddTransactions = () => {

  const shoot = () => {
    alert("Great Shot!");
  }

  return (
    <button type="button" className={css.btnAdd} onClick={shoot} >
      <img className={css.btnIcon} src={btnAddTransactions} alt=""/>
    </button>
  );
};

export default ButtonAddTransactions;
