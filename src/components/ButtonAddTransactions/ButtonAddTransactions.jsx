import css from './ButtonAddTransactions.module.css';
import btnAddTransactions from '../ButtonAddTransactions/image/btnAddTransactions.svg';
import { useState, useEffect } from 'react';
import ModalAddTransaction from 'components/ModalAddTransaction/ModalAddTransaction';

const ButtonAddTransactions = () => {

  const [isModalAddTransactionOpen, setIsModalAddTransactionOpen] = useState(false);


  const toggleModal = () => {
		setIsModalAddTransactionOpen(true);
	};


  useEffect(() => {
    if (isModalAddTransactionOpen) {
      document.body.style.overflow = 'hidden'
    }
  }, [isModalAddTransactionOpen]);

  return (
    <>
    <button  type="button" className={css.btnAdd} onClick={() => toggleModal()} >
      <img className={css.btnIcon} src={btnAddTransactions} alt="calendar"/>
    </button>
    	{isModalAddTransactionOpen && <ModalAddTransaction/> }
      </>
  );
};

export default ButtonAddTransactions;
