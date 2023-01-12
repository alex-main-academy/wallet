import css from './ButtonAddTransactions.module.css';
import btnAddTransactions from '../ButtonAddTransactions/image/btnAddTransactions.svg';
import { useState, useEffect } from 'react';
import ModalAddTransaction from 'components/ModalAddTransaction/ModalAddTransaction';

const ButtonAddTransactions = () => {
  const [isModalAddTransactionOpen, setIsModalAddTransactionOpen] =
    useState(false);

  useEffect(() => {
    if (isModalAddTransactionOpen) {
      document.body.style.overflow = 'hidden';
    }
  }, [isModalAddTransactionOpen]);

  const handleOpenModal = () => {
    setIsModalAddTransactionOpen(true);
    console.log('clicdfcd');
  };

  const handleClickClose = () => {
    setIsModalAddTransactionOpen(false);
    console.log('click');
  };

  const handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      handleClickClose();
    }
  };

  useEffect(() => {
    const closeByEsc = e => {
      if (e.code === 'Escape') {
        handleClickClose();
      }
    };

    window.addEventListener('keydown', closeByEsc);

    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, []);

  return (
    <>
      {isModalAddTransactionOpen && (
        <ModalAddTransaction
          onClose={handleClickClose}
          onClickBackdrop={handleBackdrop}
        />
      )}
      <button
        type="button"
        className={css.btnAdd}
        onClick={() => handleOpenModal()}
      >
        <img className={css.btnIcon} src={btnAddTransactions} alt="calendar" />
      </button>
    </>
  );
};

export default ButtonAddTransactions;
