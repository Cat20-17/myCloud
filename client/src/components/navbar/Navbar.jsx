import React from 'react';
import { ReactComponent as Logo } from '../../assets/images/Logo.svg';
import { ReactComponent as Avatar } from '../../assets/images/Avatar.svg';
import { ReactComponent as LogOut } from '../../assets/images/LogOut.svg';
import styles from './navbar.module.scss';
import CustomLink from '../utils/customLink/CustomLink';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/reducers/authSlice';

const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const logout = async () => {
    await dispatch(logoutUser());
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_inner_container}>
        <CustomLink to='/' className={styles.brand_section}>
          <Logo />
          <div className={styles.brand_name}>MyCloud</div>
        </CustomLink>
        <div className={styles.user_section}>
          {!isAuthenticated && <CustomLink to='/login' variant={'primary'} children={'Log in'} /> }
          {!isAuthenticated && <CustomLink to='/register' variant={'primary'} children={'Sign up'} /> }
          {isAuthenticated && <Avatar /> }
          {isAuthenticated && <CustomLink to='/login' children={<LogOut onClick={ logout } />} /> }
        </div>
      </div>
    </div>
  );
};

export default Navbar;