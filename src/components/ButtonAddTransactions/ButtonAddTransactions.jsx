import css from './ButtonAddTransactions.module.css';
import btnAddTransactions from '../ButtonAddTransactions/image/btnAddTransactions.svg';
import { useState } from 'react';
import ModalAddTransaction from 'components/ModalAddTransaction/ModalAddTransaction';

const ButtonAddTransactions = () => {

  const [isModalAddTransactionOpen, setIsModalAddTransactionOpen] = useState(false);


  const toggleModal = () => {
		setIsModalAddTransactionOpen(!isModalAddTransactionOpen);
	};


  return (
    <>
    <button className={css.btnAdd} onClick={() => toggleModal()} >
      <img className={css.btnIcon} src={btnAddTransactions} alt="calendar"/>
    </button>
    	{isModalAddTransactionOpen && <ModalAddTransaction/> }
      </>
  );
};

export default ButtonAddTransactions;
