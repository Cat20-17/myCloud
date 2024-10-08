import React from 'react';
import styles from './input.module.scss';

const Input = ({type = 'text', placeholder, value, onChange}) => {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Input;