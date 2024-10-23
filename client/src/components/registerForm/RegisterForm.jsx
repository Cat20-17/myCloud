import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../../redux/reducers/authSlice';
import Input from '../utils/input/Input';
import Button from '../utils/button/Button';
import Form from '../utils/form/Form';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nameValue, setNameValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  const onSubmit = useCallback(async(e) => {
    e.preventDefault();
    await dispatch(registerUser({userName: nameValue, email: emailValue, password: passwordValue}));
    const result = await dispatch(loginUser({email: emailValue, password: passwordValue}));

    if (loginUser.fulfilled.match(result)) {
      navigate('/user/files');
    }
  },
    [nameValue, emailValue, passwordValue, navigate, dispatch]);

  return (
    <Form onSubmit={onSubmit} name={'Sign Up'}>
      <Input placeholder={'Enter your name...'} value={nameValue} onChange={setNameValue}></Input>
      <Input type={'email'} placeholder={'Enter your email...'} value={emailValue} onChange={setEmailValue}></Input>
      <Input type={'password'} placeholder={'Enter your password...'} value={passwordValue} onChange={setPasswordValue}></Input>
      <Button type={'submit'} variant={'primary'}>Sign Up</Button>
    </Form>
  );
};

export default RegisterForm;