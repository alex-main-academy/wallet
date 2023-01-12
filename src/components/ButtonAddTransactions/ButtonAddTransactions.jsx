import css from './ButtonAddTransactions.module.css';
import btnAddTransactions from '../ButtonAddTransactions/image/btnAddTransactions.svg';
import { useState, useEffect } from 'react';
import ModalAddTransaction from 'components/ModalAddTransaction/ModalAddTransaction';

const ButtonAddTransactions = () => {

  const [isModalAddTransactionOpen, setIsModalAddTransactionOpen] = useState(false);


  const openModal = () => {
		setIsModalAddTransactionOpen(true);
	};


  useEffect(() => {
    if (isModalAddTransactionOpen) {
      document.body.style.overflow = 'hidden'
    }
  }, [isModalAddTransactionOpen]);

  return (
    <>
    {isModalAddTransactionOpen && <ModalAddTransaction/> }
    <button  type="button" className={css.btnAdd} onClick={() => openModal()} >
      <img className={css.btnIcon} src={btnAddTransactions} alt="calendar"/>
    </button>

      </>
  );
};

export default ButtonAddTransactions;
