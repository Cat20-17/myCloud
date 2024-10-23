import React, { memo } from 'react';
import styles from './form.module.scss';

const Form = memo(({children, name, onSubmit}) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.name}>{name}</div>
      {children}
    </form>
  );
});

export default Form;