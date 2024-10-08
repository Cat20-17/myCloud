import React from 'react';
import Input from '../utils/input/Input';
import Button from '../utils/button/Button';
import Form from '../utils/form/Form';
import {register} from '../../services/authService';

const RegisterForm = () => {
  const [nameValue, setNameValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  const onSubmit = async(e) => {
    e.preventDefault();
    try {
      await register({userName: nameValue, email: emailValue, password: passwordValue});
    } catch (error) {
      alert(error);
    }
  }
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