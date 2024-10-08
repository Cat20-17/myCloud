import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './customLink.module.scss';

const CustomLink = ({children, to, className, variant}) => {
  return (
    <Link
      to={to}
      className={classNames(styles.link, className, styles[variant])}>
      {children}
    </Link>
  );
};

export default CustomLink;