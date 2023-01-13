import React, { useState } from 'react';
import styles from './LanguageToggler.module.css';

export default function LanguageToggler() {
  const values = [
    { id: '1', text: 'EN' },
    {
      id: '2',
      text: 'UA',
    },
  ];

  const [activeId, setActiveId] = useState('1');

  return (
    <div className={styles.wrapper}>
      {values.map(item => (
        <button
          key={item.id}
          onClick={() => setActiveId(item.id)}
          className={styles.btn}
          style={{ color: activeId === item.id && '#24cca7' }}
        >
          {item.text}
        </button>
      ))}
    </div>
  );
}
