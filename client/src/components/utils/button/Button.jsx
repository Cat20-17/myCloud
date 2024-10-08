import React from 'react';
import styles from './button.module.scss';
import classNames from 'classnames';

const Button = ({children, onClick, type = 'button', variant = 'primary'}) => {
  return (
    <button type={type}
            onClick={onClick}
            className={classNames(styles.btn, styles[variant])}>
      {children}
    </button>
  );
};

export default Button;